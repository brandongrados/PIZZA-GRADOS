var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var cors = require("cors");
var port = process.env.PORT || 4201;
const { createServer } = require("http");
const { Server } = require("socket.io");

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

var cliente_router = require("./routes/cliente");
var usuario_router = require("./routes/usuario");
var producto_router = require("./routes/producto");
var public_router = require("./routes/public");
var customer_router = require("./routes/customer");
var venta_router = require("./routes/venta");

//parseando los datos con bodyparser
app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyparser.json({limit: '50mb', extended: true}));

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

module.exports = app;
