var Producto = require('../models/producto');
var Categoria = require('../models/categoria');
var Subcategoria = require('../models/subcategoria');
var Galeria = require('../models/galeria');
var Variedad = require('../models/variedad');
var Ingreso = require('../models/ingreso');
var Ingreso_detalle = require('../models/ingreso_detalle');
var slugify = require('slugify');
var fs = require('fs');
var path = require('path');


const registro_producto_admin = async function(req,res){
    if(req.user){
       let data = req.body;
       let productos = await Producto.find({
        titulo:data.titulo
       });
       if(productos.length >= 1){
        res.status(200).send({data:undefined, message: 'el titulo del producto ya existe'});
       }else{
        // Ahora se espera que data.portada sea el public_id o URL de Cloudinary
        data.slug = slugify(data.titulo);//el slugify es un paquete para quitar espacios y simbolos y los convierte en guiones, es el nombre que se ve en la url de las paginas
        try {
            var producto = await Producto.create(data);
            res.status(200).send({data:producto});
        } catch (error) {
            console.error("Error al guardar producto:", error);
            res.status(200).send({data:undefined, message: 'no se pudo guardar el producto'});
        }
       }
    }else{
        res.status(500).send({data:undefined, message: 'Error token2'});
    }
}

const listar_productos_admin = async function(req,res){
    if(req.user){
        let filtro = req.params['filtro'];

        let productos = await Producto.find({
            $or:[
             {titulo: new RegExp(filtro,'i')},
             {categoria: new RegExp(filtro,'i')},

            ]
        }).sort({createdAt: -1});
        res.status(200).send(productos);
    }else{
        res.status(500).send({data:undefined, message: 'Error token2'});
    }
}

const obtener_portada_producto = async function(req,res){
   let img = req.params['img'];
   fs.stat('./uploads/productos/'+img,function(err){
    if(err){
        let path_img = './uploads/default.jpg';
        res.status(200).sendFile(path.resolve(path_img));
    }else{
        let path_img = './uploads/productos/'+img;
        res.status(200).sendFile(path.resolve(path_img));
    }
});
}

const obtener_producto_admin = async function(req,res){
    if(req.user){
        let id = req.params['id'];

        try {
            let producto = await Producto.findById({_id: id});
        res.status(200).send(producto);
        } catch (error) {
            res.status(200).send(undefined);
        }
    }else{
        res.status(500).send({data:undefined, message: 'Error token'});
    }
}

const actualizar_producto_admin = async function(req,res){
    if(req.user){
        let data = req.body;
        let id = req.params['id'];

        let productos = await Producto.find({
        titulo:data.titulo
       });

       if(productos.length >= 1){
        if(productos[0]._id == id){
            // Ahora se espera que data.portada sea el public_id o URL de Cloudinary
            data.slug = slugify(data.titulo);
            try {
                let producto = await Producto.findByIdAndUpdate({_id:id},{
                    titulo:data.titulo,
                    categoria: data.categoria,
                    subcategoria: data.subcategoria,
                    extracto:data.extracto,
                    estado:data.estado,
                    str_variedad:data.str_variedad,
                    descuento:data.descuento,
                    portada:data.portada
                }, {new: true});
                res.status(200).send({data:producto});
            } catch (error) {
                res.status(200).send({data:undefined, message: 'no se pudo guardar el producto'});
            }
        }else{
            res.status(200).send({data:undefined, message: 'El título del producto ya existe.'});
        }
    }else{
        data.slug = slugify(data.titulo);
        try {
            let producto = await Producto.findByIdAndUpdate({_id:id},{
                titulo:data.titulo,
                categoria: data.categoria,
                subcategoria: data.subcategoria,
                extracto:data.extracto,
                estado:data.estado,
                str_variedad:data.str_variedad,
                descuento:data.descuento,
                portada:data.portada
            }, {new: true});
            res.status(200).send({data:producto});
        } catch (error) {
            res.status(200).send({data:undefined, message: 'no se pudo guardar el producto'});
        }
    }
    }else{
        res.status(500).send({data:undefined, message: 'Error token2'});
    }
}



const registro_variedad_producto = async (req,res)=>{
    if(req.user){
        let data = req.body;
        let variedad = await Variedad.create(data);
        res.status(200).send({data:variedad})
    }else{
        res.status(500).send({data:undefined, message: 'Error token'});
    }
}


const obtener_variedades_producto = async function (req,res){
    if(req.user){
        let id = req.params['id'];
        let variedades = await Variedad.find({producto:id}).sort({stock:-1});

        res.status(200).send(variedades);
    }else{
        res.status(500).send({data:undefined, message: 'Error token'});
    }
}

const eliminar_variedad_producto = async function (req,res){
    if(req.user){
        let id = req.params['id'];
        let reg = await Variedad.findById({_id:id});

        if(reg.stock == 0){
            let variedad = await Variedad.findOneAndRemove({_id:id});
            res.status(200).send(variedad);
        }else{
            res.status(200).send({data:undefined, message: 'No se puede eliminar esta variedad'});
        }


    }else{
        res.status(500).send({data:undefined, message: 'Error token'});
    }
}

const listar_activos_productos_admin = async function(req,res){
    if(req.user){

        let productos = await Producto.find({estado:true

        }).sort({createdAt: -1});
        res.status(200).send(productos);
    }else{
        res.status(500).send({data:undefined, message: 'Error token2'});
    }
}

const registro_ingreso_admin = async function(req,res){
    if(req.user){

        let data =req.body;//ingreso
        try {
        let reg_ingresos = await Ingreso.find().sort({createdAt:-1});

        if(reg_ingresos.length == 0 ){
        data.serie = 1;}else{
            data.serie = reg_ingresos[0].serie + 1;
        }

        let detalles = JSON.parse(data.detalles);//detalles de ingreso

        //registro ingreso
        var img_path = req.files.documento.path;
        //var str_img = img_path.split('\\');
        //var str_documento = str_img[2];
        var str_documento = path.basename(img_path);

        data.documento = str_documento;
        data.usuario = req.user.sub;
        let ingreso = await Ingreso.create(data);

        for(var item of detalles){
            item.ingreso = ingreso._id;
            await Ingreso_detalle.create(item)

            //ACTUALIZAR CANTIDADES
            let variedad = await Variedad.findById({_id: item.variedad});
            await Variedad.findByIdAndUpdate({_id: item.variedad},{
                stock: parseInt(variedad.stock)  + parseInt(item.cantidad)
            });

            let producto = await Producto.findById({_id: item.producto});
            await Producto.findByIdAndUpdate({_id: item.producto},{
                stock: parseInt(producto.stock) + parseInt(item.cantidad)
            });
            //CALCULAR MARGEN DE GANANCIA
            if(producto.stock >= 1){
                let subtotal_residual = producto.precio*producto.stock;
                let ganancia = Math.ceil((item.precio_unidad * data.ganancia)/100);
                let subtotal_ingreso = (parseFloat(item.precio_unidad) + parseFloat(ganancia))*item.cantidad;

                let cantidades = parseInt(producto.stock) + parseInt(item.cantidad);
                let subtotales = parseFloat(subtotal_residual) + parseFloat(subtotal_ingreso);

                console.log(subtotales + ''+cantidades);
                let precio_equilibrio = Math.ceil(subtotales/cantidades);
                await Producto.findByIdAndUpdate({_id: item.producto},{
                    precio: precio_equilibrio
                });

            }else{
                let ganancia = Math.ceil((item.precio_unidad * data.ganancia)/100);
                await Producto.findByIdAndUpdate({_id: item.producto},{
                    precio: parseFloat(item.precio_unidad)  + parseFloat(ganancia)
                });
            }
        }

        res.status(200).send(ingreso);
        } catch (error) {
            console.log(error);
        res.status(200).send({message:'No se pudo registrar el ingreso'})
        }


    }else{
        res.status(500).send({data:undefined, message: 'Error token2'});
    }
}

const subir_imagen_producto_admin = async function(req,res){
    if(req.user){
       let data = req.body;

        // Ahora se espera que data.imagen sea el public_id o URL de Cloudinary
        try {
            let imagen = await Galeria.create(data);
            res.status(200).send(imagen);
        } catch (error) {
            res.status(200).send({data:undefined, message: 'no se pudo guardar el producto'});
        }
    }else{
        res.status(500).send({data:undefined, message: 'Error token2'});
    }
}

const obtener_galeria_producto = async function(req,res){
    let img = req.params['img'];
    fs.stat('./uploads/galeria/'+img,function(err){
     if(err){
         let path_img = './uploads/default.jpg';
         res.status(200).sendFile(path.resolve(path_img));
     }else{
         let path_img = './uploads/galeria/'+img;
         res.status(200).sendFile(path.resolve(path_img));
     }
 });
 }


 const obtener_galeria_producto_admin = async function(req,res){
    if(req.user){
       let id = req.params['id'];
       let galeria = await Galeria.find({producto:id});
       res.status(200).send(galeria);
    }else{
        res.status(500).send({data:undefined, message: 'Error token2'});
    }
}

const eliminar_galeria_producto_admin = async function(req,res){
    if(req.user){
       let id = req.params['id'];
        try {
            let reg = await Galeria.findById({_id:id})
            let path_img = './uploads/galeria/'+reg.imagen;
            if(fs.existsSync(path_img)){
                fs.unlinkSync(path_img);
            }
            let galeria = await Galeria.findByIdAndRemove({_id:id});
       res.status(200).send(galeria);
        } catch (error) {
            console.log(error)
            res.status(200).send({data:undefined, message: 'no se pudo eliminar la imagen'});

        }
       
    }else{
        res.status(500).send({data:undefined, message: 'Error token2'});
    }
}

const crear_categoria_admin = async function(req,res){
    if(req.user){
       let data = req.body;

       try {
            var reg = await Categoria.find({titulo:data.titulo});
            if(reg.length == 0){
                data.slug = slugify(data.titulo).toLowerCase();
                var categoria = await Categoria.create(data);
                res.status(200).send(categoria);
            }else{
                res.status(200).send({data:undefined, message: 'la categoría ya existe.'});
            }

       } catch (error) {
                res.status(200).send({data:undefined, message: 'Ocurrió un error durante el proceso.'});
       }
       
    }else{
        res.status(500).send({data:undefined, message: 'Error token2'});
    }
}

const listar_categoria_admin = async function(req,res){
    if(req.user){
       

       var regs = await Categoria.find().sort({titulo:1});
       var categorias = [];
       for(var item of regs){
        var subcategorias = await Subcategoria.find({categoria:item._id});
        var productos = await Producto.find({categoria:item.titulo});
        var productosc = await Producto.find({subcategoria:item.titulo});//este cod lo agregué opcional
        categorias.push({
            categoria:item,
            subcategorias,
            nproductos: productos.length,
            nproductosc:productosc.length
        })
       }
       res.status(200).send(categorias);
       
    }else{
        res.status(500).send({data:undefined, message: 'Error token2'});
    }
}

const crear_subcategoria_admin = async function(req,res){
    if(req.user){
       let data = req.body;

       var reg = await Subcategoria.find({titulo:data.titulo});
       if(reg.length == 0){
       
        var subcategoria = await Subcategoria.create(data);
        res.status(200).send(subcategoria);
       }else{
        res.status(200).send({data:undefined, message: 'la subcategoría ya existe.'});
       }

       
    }else{
        res.status(500).send({data:undefined, message: 'Error token2'});
    }
}


const eliminar_subcategoria_admin = async function(req,res){
    if(req.user){
       let id = req.params['id'];

       var reg = await Subcategoria.findByIdAndRemove({_id:id});
       res.status(200).send(reg);
    }else{
        res.status(500).send({data:undefined, message: 'Error token2'});
    }
}

const cambiar_estado_producto_admin = async function(req,res){
    if(req.user){
        let id = req.params['id'];
        let data = req.body;

        let nuevo_estado = false;

        if(data.estado){
            nuevo_estado = false;
        }else{
            nuevo_estado = true;
        }

        let categoria=await Categoria.findByIdAndUpdate({_id:id},{
            estado:nuevo_estado,
        });
        res.status(200).send(categoria);
    }else{
        res.status(500).send({data:undefined, message: 'Error token'});
    }
}

const obtener_ingresos_admin = async function(req,res){
    if(req.user){
       let inicio = req.params['inicio'];
       let hasta = req.params['hasta'];

       var ingresos = await Ingreso.find({
        createdAt:{
            $gte: new Date(inicio+'T00:00:00'),
            $lt: new Date(new Date(hasta+'T00:00:00').getTime() + 24*60*60*1000)
        }
       });
       res.status(200).send(ingresos);
    }else{
        res.status(500).send({data:undefined, message: 'Error token2'});
    }
}
const obtener_comprobante_ingreso = async function(req,res){
    let name = req.params['name'];
    fs.stat('./uploads/facturas/'+name,function(err){
     if(err){
         let path_img = './uploads/default.jpg';
         res.status(200).sendFile(path.resolve(path_img));
     }else{
         let path_img = './uploads/facturas/'+name;
         res.status(200).sendFile(path.resolve(path_img));
     }
 });
 }

 const obtener_detalles_ingreso_admin = async function(req,res){
    if(req.user){
       let id = req.params['id'];
       var ingreso = await Ingreso.findById({_id:id});
       var detalles = await Ingreso_detalle.find({ingreso:id}).populate('producto').populate('variedad');
       res.status(200).send({ingreso,detalles});
    }else{
        res.status(500).send({data:undefined, message: 'Error token2'});
    }
}

module.exports = {
registro_producto_admin,
listar_productos_admin,
obtener_portada_producto,
obtener_producto_admin,
actualizar_producto_admin,
registro_variedad_producto,
obtener_variedades_producto,
eliminar_variedad_producto,
listar_activos_productos_admin,
registro_ingreso_admin,
subir_imagen_producto_admin,
obtener_galeria_producto,
obtener_galeria_producto_admin,
eliminar_galeria_producto_admin,
crear_categoria_admin,
listar_categoria_admin,
crear_subcategoria_admin,
eliminar_subcategoria_admin,
cambiar_estado_producto_admin,
obtener_ingresos_admin,
obtener_comprobante_ingreso,
obtener_detalles_ingreso_admin
}