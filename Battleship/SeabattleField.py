class SeabattleField:
    def __init__(self, size=10):
        self.size = size
        # Inicializamos la matriz de 10x10 con agua ("~")
        self.grid = [["~" for _ in range(self.size)] for _ in range(self.size)]
        
    def place_ship(self, row, col, length, orientation):
        """
        Lógica para colocar un barco en la matriz.
        orientation: 'H' (horizontal) o 'V' (vertical)
        """
        # Aquí iría la lógica algorítmica para escribir "B" (Barco) en la matriz
        # asegurando que no se salga de los límites.
        pass

    def receive_attack(self, row, col):
        """
        Evalúa qué pasa cuando el oponente dispara a esta coordenada.
        Retorna: "IMPACTO", "FALLO" o "HUNDIDO"
        """
        estado_actual = self.grid[row][col]
        
        if estado_actual == "B":  # Si hay un barco
            self.grid[row][col] = "X"  # Marcamos el impacto
            return "IMPACTO"
        elif estado_actual == "~": # Si hay agua
            self.grid[row][col] = "O"  # Marcamos el fallo
            return "FALLO"
        else:
            return "YA_ATACADO" # Si dispara donde ya había disparado
            
    def display(self):
        """Imprime el tablero en consola (útil para debug)."""
        for fila in self.grid:
            print(" ".join(fila))