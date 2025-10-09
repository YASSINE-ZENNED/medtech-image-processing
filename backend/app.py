from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from PIL import Image, ImageEnhance, ImageFilter
import io
import base64
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def home():
    return jsonify({
        "message": "MedTech Image Processing API",
        "endpoints": {
            "/process": "POST - Process medical images",
            "/health": "GET - Health check"
        }
    })

@app.route('/health')
def health():
    return jsonify({"status": "healthy"})

@app.route('/process', methods=['POST'])
def process_image():
    """
    Process uploaded medical image based on selected phase.

    Expected input:
    - image: base64 encoded image or file upload
    - phase: 'arterial' or 'venous'

    Returns:
    - processed_image: base64 encoded processed image
    """
    try:
        # Get the phase selection
        phase = request.form.get('phase', 'arterial')

        # Get the image file
        if 'image' not in request.files:
            return jsonify({"error": "No image file provided"}), 400

        image_file = request.files['image']

        # Open the image
        img = Image.open(image_file.stream)

        # Convert to RGB if necessary
        if img.mode != 'RGB':
            img = img.convert('RGB')

        # Process based on phase
        if phase == 'arterial':
            # Arterial phase: Increase contrast
            processed_img = increase_contrast(img)
        elif phase == 'venous':
            # Venous phase: Apply Gaussian smoothing
            processed_img = apply_gaussian_smoothing(img)
        else:
            return jsonify({"error": "Invalid phase. Use 'arterial' or 'venous'"}), 400

        # Convert processed image to base64
        buffered = io.BytesIO()
        processed_img.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode()

        return jsonify({
            "success": True,
            "processed_image": f"data:image/png;base64,{img_str}",
            "phase": phase
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

def increase_contrast(image):
    """
    Increase image contrast for arterial phase simulation.
    Uses contrast enhancement with a factor of 1.8.
    """
    enhancer = ImageEnhance.Contrast(image)
    # Increase contrast by 80%
    enhanced_img = enhancer.enhance(1.8)
    return enhanced_img

def apply_gaussian_smoothing(image):
    """
    Apply Gaussian blur for venous phase simulation.
    Uses a radius of 2 pixels for the blur effect.
    """
    # Apply Gaussian blur
    blurred_img = image.filter(ImageFilter.GaussianBlur(radius=2))
    return blurred_img

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7860, debug=False)