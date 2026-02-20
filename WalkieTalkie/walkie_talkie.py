import socket
import threading
import pyaudio

# ==========================================
# 1. CONFIGURACIÓN DE AUDIO
# ==========================================
CHUNK = 1024            # Tamaño del "trozo" de audio (mientras menor, menos lag, pero más carga de CPU)
FORMAT = pyaudio.paInt16 # Formato de 16 bits (estándar de calidad)
CHANNELS = 1            # 1 canal (Mono, suficiente para voz)
RATE = 44100            # Frecuencia de muestreo (44.1 kHz, calidad CD)

# ==========================================
# 2. CONFIGURACIÓN DE RED (UDP)
# ==========================================
# Pide tu IP y puerto
MI_IP = "127.0.0.1"     # Cámbialo por obtener_ip_local() cuando juegues en red real
MI_PUERTO = int(input("Ingresa TU puerto (ej: 5001): "))

# Pide la IP y puerto del otro Walkie-Talkie
IP_DESTINO = input("Ingresa la IP del amigo (ej: 127.0.0.1): ")
PUERTO_DESTINO = int(input("Ingresa el puerto del amigo (ej: 5002): "))

# Crear el socket UDP (SOCK_DGRAM)
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind((MI_IP, MI_PUERTO)) # Nos "anclamos" a nuestro puerto para poder escuchar

# ==========================================
# 3. INICIAR HARDWARE DE AUDIO
# ==========================================
p = pyaudio.PyAudio()

# Abrimos el micrófono (input=True)
stream_input = p.open(format=FORMAT, channels=CHANNELS, rate=RATE, input=True, frames_per_buffer=CHUNK)
# Abrimos el altavoz (output=True)
stream_output = p.open(format=FORMAT, channels=CHANNELS, rate=RATE, output=True, frames_per_buffer=CHUNK)

print("\n[*] ¡Walkie-Talkie encendido! Habla ahora. Presiona Ctrl+C para salir.")

# ==========================================
# 4. FUNCIONES DE LOS HILOS (THREADS)
# ==========================================

def recibir_audio():
    """Este hilo se dedica a escuchar la red y reproducir en el altavoz."""
    while True:
        try:
            # Recibimos un trozo de audio (usamos un buffer grande de 4096 por seguridad)
            data, addr = sock.recvfrom(4096)
            # Lo reproducimos en el altavoz
            stream_output.write(data)
        except Exception as e:
            pass

def enviar_audio():
    """Este hilo graba el micrófono y dispara los paquetes por la red."""
    while True:
        try:
            # Leemos un trozo de audio del micrófono
            data = stream_input.read(CHUNK)
            # Lo lanzamos directo a la IP y puerto del amigo
            sock.sendto(data, (IP_DESTINO, PUERTO_DESTINO))
        except Exception as e:
            pass

# ==========================================
# 5. EJECUCIÓN
# ==========================================
# Creamos los hilos
hilo_recibir = threading.Thread(target=recibir_audio)
hilo_enviar = threading.Thread(target=enviar_audio)

# Los iniciamos como "daemons" para que se cierren si cerramos el programa
hilo_recibir.daemon = True
hilo_enviar.daemon = True

hilo_recibir.start()
hilo_enviar.start()

# Mantenemos el programa principal vivo
try:
    while True:
        pass
except KeyboardInterrupt:
    print("\n[*] Apagando Walkie-Talkie...")
    stream_input.stop_stream()
    stream_input.close()
    stream_output.stop_stream()
    stream_output.close()
    p.terminate()
    sock.close()