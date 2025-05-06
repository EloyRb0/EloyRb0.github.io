import cv2
import pytesseract

# Load image and save in a variable
img = cv2.imread("placa_4.jpg")

# Change image to greyscale
gris = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Up the contrast for the image
clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8, 8))
gris = clahe.apply(gris)

# Soften the image with Gaussian Blur filter
suavizada = cv2.GaussianBlur(gris, (5, 5), 0)

# Border detection 
bordes = cv2.Canny(suavizada, 100, 200)
cv2.imshow("Bordes (Canny)", bordes)

# OCR using Tesseract 
texto_detectado = pytesseract.image_to_string(suavizada, config='--psm 8')

# Print detected text in console
print(f"Texto detectado: {texto_detectado.strip()}")

# Show visual results
cv2.imshow("Entrada", img)
cv2.imshow("Mejorada", suavizada)
cv2.waitKey(0)
cv2.destroyAllWindows()
