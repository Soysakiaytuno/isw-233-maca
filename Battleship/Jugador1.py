from SeabattleAgent import SeabattleAgent, obtener_ip_local

print("=================================")
print("      ANFITRIÓN (JUGADOR 1)      ")
print("=================================")

mi_ip = obtener_ip_local()

# 1. Pedir la semilla
entrada_semilla = input("Ingresa un número (semilla) para generar tu mapa: ")
puerto = input("Ingresa el puerto para la conexión (ej: 65432): ")
try:
    semilla = int(entrada_semilla)
except ValueError:
    print("Entrada no válida. Usando semilla por defecto (123).")
    semilla = 123

print(f"\n[*] Tu IP es: {mi_ip} (Dísela al Jugador 2)")

# 2. Iniciar el juego
agente = SeabattleAgent(mi_ip, int(puerto), is_server=True)
agente.setup_network()
agente.start_game(semilla)