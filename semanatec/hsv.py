import cv2
import numpy as np
import random

def agregar_ruido_salt_pepper(img, probabilidad):
    salida = np.copy(img)
    filas, columnas, canales = img.shape
    cantidad_ruido = int(probabilidad * filas * columnas)
    
    # Sal (píxeles blancos)
    for _ in range(cantidad_ruido // 2):
        i = random.randint(0, filas - 1)
        j = random.randint(0, columnas - 1)
        salida[i, j] = [255, 255, 255]

    # Pimienta (píxeles negros)
    for _ in range(cantidad_ruido // 2):
        i = random.randint(0, filas - 1)
        j = random.randint(0, columnas - 1)
        salida[i, j] = [0, 0, 0]

    return salida

# Carga la img
img = cv2.imread('balls.jpg')

# Agregar ruido salt and pepper
img_con_ruido = agregar_ruido_salt_pepper(img, probabilidad=0.02)

# Convertir a HSV
hsv = cv2.cvtColor(img_con_ruido, cv2.COLOR_BGR2HSV)

# Rango de amarillo
amarillo_bajo = np.array([20, 100, 100])
amarillo_alto = np.array([30, 255, 255])
    
# Crear máscara y resultado
mascara_amarilla = cv2.inRange(hsv, amarillo_bajo, amarillo_alto)
resultado = cv2.bitwise_and(img_con_ruido, img_con_ruido, mask=mascara_amarilla)

Av_filter = np.array([[1, 1, 1],
                      [1, 1, 1],
                      [1, 1, 1]]) / 9 

euler = 2.7182818284
pi = 3.14159265

Gauss_filter = np.array([[np.power(euler, -4), np.power(euler, -2),  np.power(euler, -4)],
                      [np.power(euler, -2), 1, np.power(euler, -2)],
                      [np.power(euler, -4), np.power(euler, -2),  np.power(euler, - 4)]]) / (4/pi) 


# Aplicar filtro promedio
resultado_av = cv2.filter2D(img_con_ruido, -1, Av_filter)

# Aplicar filtro gaussiano (personalizado)
resultado_gauss = cv2.filter2D(img_con_ruido, -1, Gauss_filter)

# interpolacion y subsampling
alto, ancho = img.shape[:2]
submuestreo_resize = cv2.resize(img, (ancho // 2, alto // 2), interpolation=cv2.INTER_NEAREST)

# Mostrar imágenes con filtros aplicados
cv2.imshow('Original con Ruido', img_con_ruido)
cv2.imshow('Amarillo filtrado', resultado)
cv2.imshow('Filtro Promedio aplicado', resultado_av)
cv2.imshow('Filtro Gaussiano aplicado', resultado_gauss)
cv2.imshow('Submuestreo con resize (factor 2)', submuestreo_resize)
cv2.waitKey(0)
cv2.destroyAllWindows()
