import socket
from SeabattleField import SeabattleField
class SeabattleAgent:
    def __init__(self, ip, port, is_server=False):
        self.ip = ip
        self.port = port
        self.is_server = is_server
        self.my_field = SeabattleField()
        self.connection = None
    def star_game(self):
        self.my_field.place_ship(2, 2, 3, 'H') 
        print("Tu tablero:")
        self.print_fields()

        jugando = True
        mi_turno = self.is_server
        
        while jugando:
            if mi_turno:
                print("\n--- TU TURNO DE ATACAR ---")
                cord = input("Ingresa la coordenada a atacar (ej: B1): ")
                fila, col = self.parse_move(cord)
                mensaje_ataque = self.move_to_string(fila, col)
                self.send_message(mensaje_ataque)
                
                resultado = self.receive_message()
                if resultado == "GANASTE":
                    print("¡Felicidades! Has ganado.")
                    jugando = False
                else:
                    print(f"Resultado de tu disparo: {resultado}")
                    mi_turno = False
                
            else:
                print("\n--- ESPERANDO ATAQUE DEL OPONENTE ---")
                datos_recibidos = self.receive_message()
                
                if datos_recibidos == "GANASTE":
                    print("¡Felicidades! Has ganado.")
                    jugando = False
                    continue

                if datos_recibidos.startswith("ATACAR"):
                    _, coordenadas = datos_recibidos.split(" ")
                    fila_rival, col_rival = map(int, coordenadas.split(","))
                    
                    resultado_defensa = self.my_field.shot(fila_rival, col_rival)
                    print(f"El oponente disparó a su fila {fila_rival}, col {col_rival}. Fue un: {resultado_defensa}")
                    self.print_fields()
                    
                    if self.is_game_ended():
                        self.send_message("GANASTE")
                        print("Has perdido. Todos tus barcos hundidos.")
                        jugando = False
                    else:
                        self.send_message(resultado_defensa)
                        mi_turno = True

    def parse_move(self, text):
        text = text.strip().upper() # Limpia espacios y pasa a mayúscula
        r = ord(text[0]) - ord('A') # 'A' se vuelve 0, 'B' se vuelve 1, etc.
        c = int(text[1:]) - 1       # '1' se vuelve 0, '2' se vuelve 1, etc.
        return r, c

    def move_to_string(self, x, y):
        return f"ATACAR {x},{y}"

    def print_fields(self):
        self.my_field.display()

    def is_game_ended(self):
        return self.my_field.is_losser()

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