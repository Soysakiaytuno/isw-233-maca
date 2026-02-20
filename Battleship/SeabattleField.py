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