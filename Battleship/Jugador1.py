from SeabattleAgent import SeabattleAgent

print("--- INICIANDO JUGADOR 1 (HOST) ---")
# is_server=True le dice que abra el puerto y espere
agente_servidor = SeabattleAgent('127.0.0.1', 65432, is_server=True)

# 1. Abre la conexión y espera
agente_servidor.setup_network()

# 2. Inicia el bucle del juego
agente_servidor.star_game()