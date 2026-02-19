from SeabattleAgent import SeabattleAgent

print("--- INICIANDO JUGADOR 2 (INVITADO) ---")
# is_server=False le dice que vaya a tocar la puerta de esa IP y puerto
agente_cliente = SeabattleAgent('127.0.0.1', 65432, is_server=False)

# 1. Se conecta al servidor
agente_cliente.setup_network()

# 2. Inicia el bucle del juego
agente_cliente.star_game()