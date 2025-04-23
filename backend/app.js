var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var port = process.env.port || 4201;
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

//Este código es por una advertencia de mongoose por el strictQuery en desuso
mongoose.set("strictQuery", false);

mongoose.connect("mongodb+srv://bgradosalvarez:vglL40EhDZDtaFu9@cluster0.k8hf1cj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",(err,res)=>{
    if(err){
        console.log(err);
    }else{
        httpServer.listen(port,function(){
            console.log("servidor corriendo como tortuguita "+port );
        });
    }
});

//este cod permite la trasferencia de un servidor externo a nuestro backend
//para evitar los errores de cors
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});


app.use('/api',cliente_router);
app.use('/api',usuario_router);
app.use('/api',producto_router);
app.use('/api',public_router);
app.use('/api',customer_router);
app.use('/api',venta_router);

module.exports = app;