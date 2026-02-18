import socket

# 1. Configuración inicial
IP = "127.0.0.1" # 'localhost' (tu propia PC)
PUERTO = 65432    # Un puerto libre (mayor a 1024)

# 2. Crear el objeto socket (AF_INET = IPv4, SOCK_STREAM = TCP)
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# 3. Vincular el socket a la IP y Puerto
server.bind((IP, PUERTO))

# 4. Escuchar conexiones entrantes
server.listen(1)
print(f"[*] Servidor TCP esperando en {IP}:{PUERTO}")

# 5. Aceptar la conexión (esto bloquea el programa hasta que alguien se conecte)
conexion, direccion = server.accept()
print(f"[*] Conexión establecida desde: {direccion}")

# 6. Recibir datos y responder
datos = conexion.recv(1024) # Recibe hasta 1024 bytes
print(f"[*] Cliente dice: {datos.decode('utf-8')}")

conexion.send("¡Hola Cliente! Mensaje recibido.".encode('utf-8'))

# 7. Cerrar
conexion.close()
server.close()