import socket

IP_SERVIDOR = "127.0.0.1"
PUERTO_SERVIDOR = 65432

# 1. Crear el socket
cliente = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# 2. Conectarse al servidor
cliente.connect((IP_SERVIDOR, PUERTO_SERVIDOR))

# 3. Enviar un mensaje
mensaje = "Hola Servidor, ¿me escuchas?"
cliente.send(mensaje.encode('utf-8'))

# 4. Recibir respuesta
respuesta = cliente.recv(1024)
print(f"[*] Respuesta del servidor: {respuesta.decode('utf-8')}")

# 5. Cerrar
cliente.close()