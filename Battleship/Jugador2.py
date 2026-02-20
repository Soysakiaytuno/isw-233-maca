from SeabattleAgent import SeabattleAgent
entrada_semilla = input("Ingresa un número (semilla) para generar tus barcos al azar: ")
try:
    semilla = int(entrada_semilla)

except ValueError:
    print("No ingresaste un número válido. Usando semilla por defecto (123).")
    semilla = 123

ip = input("Ingresa la IP del host (ej: 127.0.0.1): ")
puerto = input("Ingresa el puerto para la conexión (ej: 65432): ")

print("--- INICIANDO JUGADOR 2 (INVITADO) ---")

agente_cliente = SeabattleAgent(ip, int(puerto), is_server=False)

agente_cliente.my_field.place_ships_randomly(semilla)

agente_cliente.setup_network()

agente_cliente.star_game()