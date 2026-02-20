import socket
import pyaudio

# Configuración de Audio
CHUNK = 1024
FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 44100

# Configuración de Red
IP = "0.0.0.0"  # 0.0.0.0 le dice que escuche en todas sus direcciones IP locales
PUERTO = 5005

# 1. Preparar Socket UDP
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind((IP, PUERTO))

# 2. Preparar PyAudio (Solo Salida / Altavoces)
p = pyaudio.PyAudio()
stream_output = p.open(format=FORMAT, 
                       channels=CHANNELS, 
                       rate=RATE, 
                       output=True)

print(f"\n[*] SERVIDOR DE AUDIO INICIADO")
print(f"[*] Escuchando en el puerto {PUERTO}... (Presiona Ctrl+C para apagar)")

try:
    # 3. Bucle infinito de escucha
    while True:
        # Recibimos el paquete de audio (usamos un buffer de 4096 por seguridad)
        data, addr = sock.recvfrom(4096)
        # Lo mandamos directo a los altavoces
        stream_output.write(data)

except KeyboardInterrupt:
    print("\n[*] Apagando servidor...")
finally:
    # Limpieza al cerrar
    stream_output.stop_stream()
    stream_output.close()
    p.terminate()
    sock.close()