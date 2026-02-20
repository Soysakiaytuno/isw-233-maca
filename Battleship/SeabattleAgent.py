import socket
import sys
from SeabattleField import SeabattleField

def obtener_ip_local():
    """Descubre la IP de tu computadora en la red local."""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

class SeabattleAgent:
    def __init__(self, ip, port, is_server=False):
        self.ip = ip
        self.port = port
        self.is_server = is_server
        self.my_field = SeabattleField(size=8)
        self.connection = None

    def setup_network(self):
        """Configura la conexión TCP."""
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        
        if self.is_server:
            sock.bind((self.ip, self.port))
            sock.listen(1)
            print(f"[*] Esperando al oponente en {self.ip}:{self.port}...")
            self.connection, address = sock.accept()
            print(f"[*] Oponente conectado desde {address[0]}")
        else:
            try:
                sock.connect((self.ip, self.port))
                self.connection = sock
                print(f"[*] Conectado al servidor en {self.ip}:{self.port}")
            except Exception as e:
                print(f"Error al conectar: {e}")
                sys.exit()

    def send_message(self, message):
        if self.connection:
            self.connection.send(message.encode('utf-8'))

    def receive_message(self):
        if self.connection:
            data = self.connection.recv(1024)
            return data.decode('utf-8')

    def parse_move(self, text):
        """Convierte ej: 'B5' en coordenadas de matriz (1, 4)"""
        text = text.strip().upper()
        try:
            r = ord(text[0]) - ord('A')
            c = int(text[1:]) - 1
            return r, c
        except:
            return -1, -1

    def start_game(self, seed_value):
        # 1. Colocar barcos
        self.my_field.place_ships_randomly(seed_value)
        print("\n--- TU FLOTA (MANTÉNLA EN SECRETO) ---")
        self.my_field.display()

        # 2. Iniciar turnos
        jugando = True
        mi_turno = self.is_server # El servidor dispara primero
        
        while jugando:
            if mi_turno:
                print("\n--- TU TURNO DE ATACAR ---")
                valido = False
                while not valido:
                    cord = input("Ingresa la coordenada a atacar (ej: B5): ")
                    fila, col = self.parse_move(cord)
                    
                    if 0 <= fila < self.my_field.size and 0 <= col < self.my_field.size:
                        valido = True
                    else:
                        print("Coordenada inválida. Debe ser entre A1 y J10.")

                mensaje_ataque = f"ATACAR {fila},{col}"
                self.send_message(mensaje_ataque)
                
                resultado = self.receive_message()
                if resultado == "GANASTE":
                    print("¡Felicidades! Has hundido toda la flota enemiga.")
                    jugando = False
                else:
                    print(f"Resultado de tu disparo en {cord.upper()}: {resultado}")
                    mi_turno = False
                
            else:
                print("\n--- ESPERANDO ATAQUE DEL OPONENTE ---")
                datos_recibidos = self.receive_message()
                
                if datos_recibidos == "GANASTE":
                    print("El oponente ha hundido todos tus barcos. ¡Has perdido!")
                    jugando = False
                    continue

                if datos_recibidos.startswith("ATACAR"):
                    _, coordenadas = datos_recibidos.split(" ")
                    fila_rival, col_rival = map(int, coordenadas.split(","))
                    
                    resultado_defensa = self.my_field.shot(fila_rival, col_rival)
                    letra_fila = chr(ord('A') + fila_rival)
                    num_col = col_rival + 1
                    
                    print(f"El oponente disparó a {letra_fila}{num_col}. Fue un: {resultado_defensa}")
                    print("Tu tablero actualizado:")
                    self.my_field.display()
                    
                    if self.my_field.is_losser():
                        self.send_message("GANASTE")
                        print("Todos tus barcos fueron hundidos. Fin del juego.")
                        jugando = False
                    else:
                        self.send_message(resultado_defensa)
                        mi_turno = True