class Juego:
    turno: 1
    tablero: None
    naves: None
    def __init__(self, tablero, naves):
        self.tablero = tablero
        self.naves = naves