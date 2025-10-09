# Surgical Planning Simulation

A full-stack web application for medical image processing that simulates different imaging phases for surgical planning.

## 🔗 Live Demo

 **Backend API**: https://zenned-ai-tech-test.hf.space
 **Live Application (GitHub Pages)**: https://YASSINE-ZENNED.github.io/medtech-image-processing/
## 📋 Features

### 1. Upload Image
Upload a JPG or PNG medical image for processing.

### 2. Select Phase
- **Arterial Phase**: Increases image contrast by 80% to simulate arterial enhancement
- **Venous Phase**: Applies Gaussian smoothing (blur) to simulate venous phase imaging

### 3. Process Image
The image is sent to the backend server (Python/Flask) for processing. Original and processed images are displayed side-by-side for comparison.

## 🛠️ Tech Stack

**Frontend**: React, TypeScript, Vite  
**Backend**: Python, Flask, Pillow (PIL)  
**Hosting**: GitHub Pages (Frontend), Hugging Face Spaces (Backend)

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📡 Backend API

**Endpoint**: `https://zenned-ai-tech-test.hf.space/process`

**Request**:
- Method: POST
- Body: multipart/form-data
    - `image`: Image file (JPG/PNG)
    - `phase`: "arterial" or "venous"

**Response**:
```json
{
  "success": true,
  "processed_image": "data:image/png;base64,...",
  "phase": "arterial"
}
```

## 📝 Notes

Image processing is performed entirely on the backend server. The frontend only handles user input and display.
