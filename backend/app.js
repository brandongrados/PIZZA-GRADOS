var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require("path");
var port = process.env.PORT || 4201;
const { createServer } = require("http");
const { Server } = require("socket.io");

// 1. Importar dotenv y express-fileupload
const dotenv = require('dotenv'); // Para cargar variables de entorno
const fileUpload = require('express-fileupload'); // Middleware para manejar la subida de archivos

var app = express();

const httpServer = createServer(app);
const io = new Server(httpServer,{
cors: {origin:'*'}
});

io.on('connection',(socket)=>{
 socket.on('send_cart',function(data){
 io.emit('listen_cart',data);
 })
});

// Importar los routers existentes
var cliente_router = require("./routes/cliente");
var usuario_router = require("./routes/usuario");
var producto_router = require("./routes/producto");
var public_router = require("./routes/public");
var customer_router = require("./routes/customer");
var venta_router = require("./routes/venta");

// 2. Importar el nuevo router para imágenes (que crearás en routes/imageRoutes.js)
var image_router = require("./routes/imageRoutes"); // <<-- Agrega esta línea

// Cargar variables de entorno al inicio de tu aplicación
dotenv.config(); // <<-- Agrega esta línea para que process.env funcione

// Configuración de Cloudinary (idealmente debería estar aquí o en un archivo de configuración separado)
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


//parseando los datos con bodyparser
app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyparser.json({limit: '50mb', extended: true}));

// 3. Agregar el middleware express-fileupload
app.use(fileUpload({
  useTempFiles: true, // Esto hace que los archivos se guarden temporalmente en el sistema de archivos
  tempFileDir: '/tmp/' // Directorio temporal. En Render, /tmp/ es un buen lugar.
}));


//Usar cors para permitir peticiones desde el frontend
const allowedOrigins = ['https://pizza-grados-1.onrender.com', 'https://pizza-grados-2.onrender.com'];

app.use(cors({
 origin: function(origin, callback){
if(!origin) return callback(null, true);
 if(allowedOrigins.indexOf(origin) === -1){
var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
 return callback(new Error(msg), false);
 }
return callback(null, true);
},
methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
allowedHeaders: ['Authorization', 'X-API-KEY', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
credentials: true
}));

//Este código es por una advertencia de mongoose por el strictQuery en desuso
mongoose.set("strictQuery", false);

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
console.error("Error: La variable de entorno MONGODB_URI no está definida.");
process.exit(1);
}

mongoose.connect(mongoUri, (err, res) => {
 if (err) {
console.log(err);
 } else {
 httpServer.listen(port, function () {
 console.log("servidor corriendo como tortuguita " + port);
 });
 }
});

app.use('/api',cliente_router);
app.use('/api',usuario_router);
app.use('/api',producto_router);
app.use('/api',public_router);
app.use('/api',customer_router);
app.use('/api',venta_router);
// 4. Usar el nuevo router para imágenes
app.use('/api', image_router); // <<-- Agrega esta línea

const frontendDistPath = path.resolve(process.cwd(), 'tienda/dist');

// Servir archivos estáticos del frontend
app.use(express.static(frontendDistPath));

// Ruta catch-all para manejar rutas del frontend (Vue Router history mode)
app.get('*', (req, res) => {
 res.sendFile(path.join(frontendDistPath, 'index.html'));
});

module.exports = app;