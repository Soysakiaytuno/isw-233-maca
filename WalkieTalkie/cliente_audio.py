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

# 1. Pedir datos de conexión
IP_SERVIDOR = input("Ingresa la IP del Servidor (la que se mostró en la otra pantalla): ")
entrada_puerto = input("Ingresa el puerto del Servidor (ej. 5005): ")
PUERTO_SERVIDOR = int(entrada_puerto) if entrada_puerto.strip() else 5005

# 2. Preparar Socket UDP
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

# 3. Preparar Micrófono
p = pyaudio.PyAudio()
stream_input = p.open(format=FORMAT, 
                      channels=CHANNELS, 
                      rate=RATE, 
                      input=True, 
                      frames_per_buffer=CHUNK)

print(f"\n[*] CONECTADO. Transmitiendo tu voz hacia {IP_SERVIDOR}:{PUERTO_SERVIDOR}")
print("[*] Habla por el micrófono... (Presiona Ctrl+C para detener)")

try:
    while True:
        # EL SECRETO: exception_on_overflow=False evita que el programa explote 
        # si el micrófono captura datos más rápido de lo que la red puede enviar
        data = stream_input.read(CHUNK, exception_on_overflow=False)
        
        # Enviar por UDP
        sock.sendto(data, (IP_SERVIDOR, PUERTO_SERVIDOR))

except KeyboardInterrupt:
    print("\n[*] Deteniendo transmisión...")
except Exception as e:
    print(f"\n[!] Ocurrió un error: {e}")
finally:
    stream_input.stop_stream()
    stream_input.close()
    p.terminate()
    sock.close()