// backend/routes/imageRoutes.js (o un archivo similar)
const express = require('express');
const router = express.Router();
const { uploadProductImage } = require('../controllers/imageController'); // Ajusta la ruta si tu controlador está en otro lugar

// Define tu endpoint POST para subir imágenes
// Por ejemplo, /api/productos/upload-image
router.post('/upload-image-product', uploadProductImage); // Puedes elegir el nombre que quieras para el endpoint

module.exports = router;