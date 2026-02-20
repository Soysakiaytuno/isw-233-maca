from SeabattleAgent import SeabattleAgent

ip = input("Ingresa la IP del host (ej: 127.0.0.1): ")
puerto = input("Ingresa el puerto para la conexión (ej: 65432): ")

print("--- INICIANDO JUGADOR 2 (INVITADO) ---")
# is_server=False le dice que vaya a tocar la puerta de esa IP y puerto
agente_cliente = SeabattleAgent(ip, int(puerto), is_server=False)

# 1. Se conecta al servidor
agente_cliente.setup_network()

# 2. Inicia el bucle del juego
agente_cliente.star_game()