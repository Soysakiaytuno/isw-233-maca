import socket
from SeabattleAgent import SeabattleAgent

entrada_semilla = input("Ingresa un número (semilla) para generar tus barcos al azar: ")
try:
    semilla = int(entrada_semilla)

except ValueError:
    print("No ingresaste un número válido. Usando semilla por defecto (123).")
    semilla = 123

def obtener_ip_local():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

ip = obtener_ip_local()
puerto = input("Ingresa el puerto para la conexión (ej: 65432): ")

print("--- INICIANDO JUGADOR 1 (HOST) ---")

print(f"[*] Tu IP local es: {ip}")

print(f"[*] Pídele al Jugador 2 que se conecte a esta IP.")

agente_servidor = SeabattleAgent(ip, int(puerto), is_server=True)

agente_servidor.my_field.place_ships_randomly(semilla)

agente_servidor.setup_network()

agente_servidor.star_game()

