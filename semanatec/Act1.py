import cv2
import pytesseract

# Configurar tesseract
#pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Cargar imagen
img = cv2.imread("placa_4.jpg")

# Escala de grises
gris = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Mejorar contraste
clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8,8))
gris = clahe.apply(gris)

# Suavizar con Gaussian Blur
suavizada = cv2.GaussianBlur(gris, (5, 5), 0)

# Bordes
bordes = cv2.Canny(suavizada, 100, 200)
cv2.imshow("Bordes (Canny)", bordes)

# OCR
texto_detectado = pytesseract.image_to_string(suavizada, config='--psm 8')

print("Texto detectado:", texto_detectado.strip())

# Mostrar resultado visual
cv2.imshow("Entrada", img)
cv2.imshow("Mejorada", suavizada)
cv2.waitKey(0)
cv2.destroyAllWindows()
