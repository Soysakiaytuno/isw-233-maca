class SeabattleField:
    def __init__(self, size=10):
        self.size = size
        # Inicializamos la matriz de 10x10 con agua ("~")
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
        # 1. Validar que no se salga de los límites
        if orientation == 'H' and col + length > self.size:
            return False
        if orientation == 'V' and row + length > self.size:
            return False

        # 2. Validar que no haya otro barco en ese espacio
        if orientation == 'H':
            for i in range(length):
                if self.grid[row][col + i] != "~":
                    return False
        else: # 'V'
            for i in range(length):
                if self.grid[row + i][col] != "~":
                    return False

        # 3. Si pasó las validaciones, lo colocamos (marcamos con "B")
        if orientation == 'H':
            for i in range(length):
                self.grid[row][col + i] = "B"
        else:
            for i in range(length):
                self.grid[row + i][col] = "B"
                
        return True

    def display(self):
        """Imprime el tablero en consola (útil para debug)."""
        for fila in self.grid:
            print(" ".join(fila))