import socket
import pyaudio

def obtener_ip_local():
    """Obtiene la IP local de esta computadora."""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

# Configuración de Audio
CHUNK = 1024
FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 44100

print("=================================")
print("        SERVIDOR DE AUDIO        ")
print("=================================")

# 1. Obtener IP y Puerto
mi_ip = obtener_ip_local()
entrada_puerto = input("Ingresa el puerto para escuchar (ej. 5005): ")
PUERTO = int(entrada_puerto) if entrada_puerto.strip() else 5005

# 2. Preparar Socket UDP
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind(("0.0.0.0", PUERTO)) # 0.0.0.0 permite escuchar desde cualquier tarjeta de red

# 3. Preparar Altavoces
p = pyaudio.PyAudio()
stream_output = p.open(format=FORMAT, 
                       channels=CHANNELS, 
                       rate=RATE, 
                       output=True)

print("\n[*] SERVIDOR INICIADO CORRECTAMENTE")
print(f"[*] --> Dile al Cliente que se conecte a esta IP: {mi_ip}")
print(f"[*] --> Usando el puerto: {PUERTO}")
print("[*] Escuchando... (Presiona Ctrl+C para apagar)")

try:
    while True:
        # Recibimos el paquete de audio
        data, addr = sock.recvfrom(4096)
        # Lo reproducimos en los altavoces
        stream_output.write(data)

except KeyboardInterrupt:
    print("\n[*] Apagando servidor...")
except Exception as e:
    print(f"\n[!] Ocurrió un error: {e}")
finally:
    stream_output.stop_stream()
    stream_output.close()
    p.terminate()
    sock.close()