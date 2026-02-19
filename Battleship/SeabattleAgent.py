import socket
from SeabattleField import SeabattleField
class SeabattleAgent:
    def __init__(self, ip, port, is_server=False):
        self.ip = ip
        self.port = port
        self.is_server = is_server
        self.my_field = SeabattleField() # Instanciamos el tablero del jugador
        self.connection = None # Aquí guardaremos el socket de la conexión activa
        
    def setup_network(self):
        """Configura la conexión TCP dependiendo de si es Servidor o Cliente."""
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        
        if self.is_server:
            sock.bind((self.ip, self.port))
            sock.listen(1)
            print(f"[*] Esperando al oponente en {self.ip}:{self.port}...")
            self.connection, address = sock.accept()
            print(f"[*] Oponente conectado desde {address}")
        else:
            sock.connect((self.ip, self.port))
            self.connection = sock
            print(f"[*] Conectado al servidor en {self.ip}:{self.port}")

    def send_message(self, message):
        """Envía un string a través de la conexión TCP."""
        if self.connection:
            self.connection.send(message.encode('utf-8'))

    def receive_message(self):
        """Espera y recibe un string a través de la conexión TCP."""
        if self.connection:
            data = self.connection.recv(1024)
            return data.decode('utf-8')

    def play_game(self):
        """El bucle principal del juego."""
        # 1. Fase de preparación (colocar barcos en self.my_field)
        
        # 2. Bucle de turnos
        jugando = True
        mi_turno = self.is_server # Por convención, el servidor podría empezar
        
        while jugando:
            if mi_turno:
                # Lógica para atacar: pedir coordenadas, enviar por TCP, recibir resultado
                print("Es mi turno de atacar...")
                # self.send_message("ATACAR 4,5")
                # resultado = self.receive_message()
                mi_turno = False
            else:
                # Lógica para defender: esperar coordenadas por TCP, revisar en self.my_field, enviar resultado
                print("Esperando el ataque del oponente...")
                # ataque = self.receive_message()
                # evaluar con self.my_field.receive_attack()
                # self.send_message("IMPACTO")
                mi_turno = True