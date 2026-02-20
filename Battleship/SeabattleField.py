import random
class SeabattleField:
    def __init__(self, size=8):
        self.size = size
        self.grid = [["~" for _ in range(self.size)] for _ in range(self.size)]
    def shot(self, x, y):
        estado_actual = self.grid[x][y]
        if estado_actual == "B":
            self.mark(x, y, "X")
            return "IMPACTO"
        elif estado_actual == "~":
            self.mark(x, y, "O")
            return "FALLO"
        return "YA_ATACADO"

    def mark(self, x, y, value):
        self.grid[x][y] = value

    def is_losser(self):
        for fila in self.grid:
            if "B" in fila:
                return False
        return True

    def place_ship(self, row, col, length, orientation):
        if orientation == 'H' and col + length > self.size:
            return False
        if orientation == 'V' and row + length > self.size:
            return False
        
        if orientation == 'H':
            for i in range(length):
                if self.grid[row][col + i] != "~":
                    return False
        else:
            for i in range(length):
                if self.grid[row + i][col] != "~":
                    return False

        if orientation == 'H':
            for i in range(length):
                self.grid[row][col + i] = "B"
        else:
            for i in range(length):
                self.grid[row + i][col] = "B"
                
        return True

    def display(self):
        print("  1 2 3 4 5 6 7 8")
        for i, fila in enumerate(self.grid):
            letra = chr(ord('A') + i)
            print(f"{letra} " + " ".join(fila))
    import random

# (Añade estos métodos dentro de tu clase SeabattleField)

    def can_place_ship(self, row, col, length, orientation):
        """Valida que el barco no se salga de los límites ni toque a otros."""
        # 1. Validar que no se salga del tablero
        if orientation == 'H' and col + length > self.size:
            return False
        if orientation == 'V' and row + length > self.size:
            return False

        # 2. Definir el "área de seguridad" (un cuadro alrededor del barco)
        # Restamos 1 y sumamos 1 a las coordenadas para revisar las diagonales y bordes
        start_row = max(0, row - 1)
        # Si es vertical, el alto es la longitud del barco, si es horizontal es 1
        end_row = min(self.size - 1, row + (length if orientation == 'V' else 1))
        
        start_col = max(0, col - 1)
        # Si es horizontal, el ancho es la longitud del barco, si es vertical es 1
        end_col = min(self.size - 1, col + (length if orientation == 'H' else 1))

        # 3. Revisar que toda esa área sea agua ("~")
        for r in range(start_row, end_row + 1):
            for c in range(start_col, end_col + 1):
                if self.grid[r][c] != "~":
                    return False # Hay otro barco tocando o superponiéndose

        return True

    def place_ships_randomly(self, seed_value):
        """Genera la flota completa usando una semilla aleatoria."""
        random.seed(seed_value)
        
        # Inventario de barcos: 1 de 4, 2 de 3, 3 de 2, 4 de 1
        flota = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]
        
        for length in flota:
            colocado = False
            intentos = 0
            
            # Intentamos colocar el barco hasta encontrar un espacio válido
            while not colocado and intentos < 1000:
                row = random.randint(0, self.size - 1)
                col = random.randint(0, self.size - 1)
                orientation = random.choice(['H', 'V'])
                
                if self.can_place_ship(row, col, length, orientation):
                    # Si es válido, lo dibujamos en la matriz
                    if orientation == 'H':
                        for i in range(length):
                            self.grid[row][col + i] = "B"
                    else: # 'V'
                        for i in range(length):
                            self.grid[row + i][col] = "B"
                    colocado = True
                
                intentos += 1
                
            if not colocado:
                print(f"Error: Tablero muy lleno. No se pudo colocar el barco de tamaño {length}")