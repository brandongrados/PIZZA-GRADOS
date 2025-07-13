// backend/controllers/imageController.js (o un archivo similar)
const cloudinary = require('cloudinary').v2; // Asegúrate de usar v2
const fs = require('fs'); // Módulo de Node.js para manejar el sistema de archivos (para eliminar archivos temporales si es necesario)


const uploadProductImage = async (req, res) => {
  try {
    // 1. Verificar si hay archivos
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ msg: 'No se subió ningún archivo.' });
    }

    const file = req.files.image; // 'image' debe coincidir con el nombre del campo en tu FormData del frontend

    // 2. Validaciones de tamaño y tipo (puedes duplicar las del frontend o hacerlas aquí robustas)
    const MAX_SIZE = 1000000; // 1MB
    if (file.size > MAX_SIZE) {
      // Eliminar archivo temporal si express-fileupload lo guarda
      if (file.tempFilePath && fs.existsSync(file.tempFilePath)) {
        fs.unlinkSync(file.tempFilePath);
      }
      return res.status(400).json({ msg: 'La imagen debe ser menos de 1MB.' });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
      // Eliminar archivo temporal
      if (file.tempFilePath && fs.existsSync(file.tempFilePath)) {
        fs.unlinkSync(file.tempFilePath);
      }
      return res.status(400).json({ msg: 'El recurso debe ser una imagen (JPG, JPEG, PNG, WEBP).' });
    }

    // 3. Subir la imagen a Cloudinary
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "uploads/productos" // Esto creará la carpeta "uploads/productos" en Cloudinary
      // Puedes añadir más opciones aquí como `quality`, `width`, `height`, etc.
    });

    // 4. Eliminar el archivo temporal del servidor después de subirlo a Cloudinary
    if (file.tempFilePath && fs.existsSync(file.tempFilePath)) {
      fs.unlinkSync(file.tempFilePath);
    }

    // 5. Responder al frontend con la URL y el public_id
    res.json({
      secure_url: result.secure_url,
      public_id: result.public_id,
      msg: 'Imagen subida exitosamente.'
    });

  } catch (error) {
    console.error('Error al subir la imagen:', error);
    // Asegúrate de limpiar archivos temporales en caso de error
    if (req.files && req.files.image && req.files.image.tempFilePath && fs.existsSync(req.files.image.tempFilePath)) {
        fs.unlinkSync(req.files.image.tempFilePath);
    }
    res.status(500).json({ msg: 'Error interno del servidor al subir la imagen.' });
  }
};

module.exports = {
  uploadProductImage
};