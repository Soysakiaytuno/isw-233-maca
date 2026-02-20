import socket
import pyaudio

# Configuración de Audio
CHUNK = 1024
FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 44100

print("=================================")
print("      CLIENTE TRANSMISOR DE VOZ  ")
print("=================================")

# Configuración de Red
IP_SERVIDOR = input("Ingresa la IP del Servidor que va a escuchar (ej. 127.0.0.1): ")
PUERTO_SERVIDOR = 5005

# 1. Preparar Socket UDP
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

# 2. Preparar PyAudio (Solo Entrada / Micrófono)
p = pyaudio.PyAudio()
stream_input = p.open(format=FORMAT, 
                      channels=CHANNELS, 
                      rate=RATE, 
                      input=True, 
                      frames_per_buffer=CHUNK)

print(f"\n[*] CONECTADO. Transmitiendo tu voz hacia {IP_SERVIDOR}:{PUERTO_SERVIDOR}")
print("[*] Habla por el micrófono... (Presiona Ctrl+C para detener)")

try:
    # 3. Bucle infinito de transmisión
    while True:
        # Capturamos un trozo de audio del micrófono
        data = stream_input.read(CHUNK)
        # Lo disparamos por UDP hacia el servidor
        sock.sendto(data, (IP_SERVIDOR, PUERTO_SERVIDOR))

except KeyboardInterrupt:
    print("\n[*] Deteniendo transmisión...")
finally:
    # Limpieza al cerrar
    stream_input.stop_stream()
    stream_input.close()
    p.terminate()
    sock.close()