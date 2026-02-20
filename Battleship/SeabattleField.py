import random

class SeabattleField:
    def __init__(self, size=8):
        self.size = size
        self.grid = [["~" for _ in range(self.size)] for _ in range(self.size)]

    def shot(self, x, y):
        estado_actual = self.grid[x][y]
        if estado_actual in ["D", "C", "A", "S"]:
            self.mark(x, y, "X") # X = Impacto
            return "IMPACTO"
        elif estado_actual == "~":
            self.mark(x, y, "O") # O = Fallo en el agua
            return "FALLO"
        return "YA_ATACADO"

    def mark(self, x, y, value):
        self.grid[x][y] = value

    def is_losser(self):
        for fila in self.grid:
            for barco in ["S", "D", "C", "A"]:
                if barco in fila:
                    return False
        return True

    def can_place_ship(self, row, col, length, orientation):
        """Valida que el barco no se salga de los límites ni toque a otros."""
        if orientation == 'H' and col + length > self.size:
            return False
        if orientation == 'V' and row + length > self.size:
            return False

        # Área de seguridad (1 casilla extra alrededor)
        start_row = max(0, row - 1)
        end_row = min(self.size - 1, row + (length if orientation == 'V' else 1))
        start_col = max(0, col - 1)
        end_col = min(self.size - 1, col + (length if orientation == 'H' else 1))

        for r in range(start_row, end_row + 1):
            for c in range(start_col, end_col + 1):
                if self.grid[r][c] != "~":
                    return False
        return True

    def place_ships_randomly(self, seed_value):
        """Genera la flota completa usando una semilla aleatoria."""
        random.seed(seed_value)
        flota = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]
        letras_barco = {1: "S", 2: "D", 3: "C", 4: "A"}
        
        for length in flota:
            colocado = False
            intentos = 0
            
            while not colocado and intentos < 1000:
                row = random.randint(0, self.size - 1)
                col = random.randint(0, self.size - 1)
                orientation = random.choice(['H', 'V'])
                
                if self.can_place_ship(row, col, length, orientation):
                    letra = letras_barco[length]
                    if orientation == 'H':
                        for i in range(length):
                            self.grid[row][col + i] = letra
                    else:
                        for i in range(length):
                            self.grid[row + i][col] = letra
                    colocado = True
                intentos += 1
                
            if not colocado:
                print(f"Error: Tablero muy lleno. No se pudo colocar el barco de tamaño {length}")

    def display(self):
        """Imprime el tablero en consola."""
        numeros = " ".join([str(i+1) for i in range(self.size)])
        print(f"   {numeros}")
        for i, fila in enumerate(self.grid):
            letra = chr(ord('A') + i)
            # Imprime la letra, ajusta el espacio y une las celdas
            print(f"{letra}  " + " ".join(fila))