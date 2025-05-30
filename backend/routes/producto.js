var express = require("express");
var productoController = require("../controllers/productoController");
var authenticate = require("../middlewares/authenticate");
var multipart = require('connect-multiparty');

var api = express.Router();
var path = multipart({uploadDir:'./uploads/productos'});//del multipart
var path_ingreso = multipart({uploadDir:'./uploads/facturas'});//del multipart
var path_galeria = multipart({uploadDir:'./uploads/galeria'});//del multipart


function logRequest(req, res, next) {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  console.log("Files:", req.files);
  next();
}

api.post('/registro_producto_admin', logRequest, authenticate.decodeToken, productoController.registro_producto_admin);
api.get('/listar_productos_admin/:filtro?',authenticate.decodeToken,productoController.listar_productos_admin);
api.get('/listar_activos_productos_admin',authenticate.decodeToken,productoController.listar_activos_productos_admin);


api.get('/obtener_portada_producto/:img',productoController.obtener_portada_producto);
api.get('/obtener_producto_admin/:id',authenticate.decodeToken,productoController.obtener_producto_admin);
api.put('/actualizar_producto_admin/:id',authenticate.decodeToken,productoController.actualizar_producto_admin);

///////////////////////////////////////////////

api.post('/registro_variedad_producto',authenticate.decodeToken,productoController.registro_variedad_producto);
api.get('/obtener_variedades_producto/:id',authenticate.decodeToken,productoController.obtener_variedades_producto);
api.delete('/eliminar_variedad_producto/:id',authenticate.decodeToken,productoController.eliminar_variedad_producto);
//////////////////////////////////////////////
api.post('/registro_ingreso_admin',[authenticate.decodeToken,path_ingreso],productoController.registro_ingreso_admin);
api.get('/obtener_ingresos_admin/:inicio/:hasta',authenticate.decodeToken,productoController.obtener_ingresos_admin);
api.get('/obtener_comprobante_ingreso/:name',productoController.obtener_comprobante_ingreso);
api.get('/obtener_detalles_ingreso_admin/:id',authenticate.decodeToken,productoController.obtener_detalles_ingreso_admin);
//////////////////////////////////////////////
api.post('/subir_imagen_producto_admin',[authenticate.decodeToken,path_galeria],productoController.subir_imagen_producto_admin);
api.get('/obtener_galeria_producto/:img',productoController.obtener_galeria_producto);
api.get('/obtener_galeria_producto_admin/:id',authenticate.decodeToken,productoController.obtener_galeria_producto_admin);
api.delete('/eliminar_galeria_producto_admin/:id',authenticate.decodeToken,productoController.eliminar_galeria_producto_admin);

api.post('/crear_categoria_admin',authenticate.decodeToken,productoController.crear_categoria_admin);
api.get('/listar_categoria_admin',authenticate.decodeToken,productoController.listar_categoria_admin);
api.post('/crear_subcategoria_admin',authenticate.decodeToken,productoController.crear_subcategoria_admin);
api.delete('/eliminar_subcategoria_admin/:id',authenticate.decodeToken,productoController.eliminar_subcategoria_admin);
api.put('/cambiar_estado_producto_admin/:id',authenticate.decodeToken,productoController.cambiar_estado_producto_admin);
module.exports = api;