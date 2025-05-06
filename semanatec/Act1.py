import cv2
import pytesseract

# Load image and save in a variable
img = cv2.imread("placa_4.jpg")

# Change image to greyscale
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Up the contrast for the image
clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8, 8))
gray = clahe.apply(gray)

# Soften the image with Gaussian Blur filter
softened_img = cv2.GaussianBlur(gray, (5, 5), 0)

# Border detection 
borders_img = cv2.Canny(softened_img, 100, 200)
cv2.imshow("borders_img (Canny)", borders_img)

# OCR using Tesseract 
detected_text = pytesseract.image_to_string(softened_img, config='--psm 8')

# Print detected text in console
print(f"Detected text: {detected_text.strip()}")

# Show visual results
cv2.imshow("Entry image", img)
cv2.imshow("Gaussian Blur image", softened_img)
cv2.waitKey(0)
cv2.destroyAllWindows()
