from SeabattleAgent import SeabattleAgent

print("=================================")
print("       CLIENTE (JUGADOR 2)       ")
print("=================================")

# 1. Pedir la IP del anfitrión
ip_host = input("Ingresa la IP del Anfitrión (ej. 192.168.x.x): ")
puerto = input("Ingresa el puerto para la conexión: ")
# 2. Pedir la semilla
entrada_semilla = input("\nIngresa un número (semilla) diferente al J1 para tu mapa: ")
try:
    semilla = int(entrada_semilla)
except ValueError:
    print("Entrada no válida. Usando semilla por defecto (999).")
    semilla = 999

# 3. Iniciar el juego
agente = SeabattleAgent(ip_host, int(puerto), is_server=False)
agente.setup_network()
agente.start_game(semilla)