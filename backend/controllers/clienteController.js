var Cliente = require('../models/cliente')
var bcrypt = require('bcrypt-nodejs')
var jwt = require('../helpers/cjwt')
//creando un método testing
const registro_cliente_ecommerce = async function(req,res){
    let data = req.body;

    let reg = await Cliente.find({email:data.email});
    if(reg.length >=1){
        res.status(200).send({message:'El correo electrónico ya existe'});
    }else{
        bcrypt.hash(data.password,null,null,async function(err,hash){
            if(err){
                res.status(200).send({message:'Problema durante la encriptación'});
            }else{
                data.password = hash
                let cliente = await Cliente.create(data);
                res.status(200).send(cliente);
            }
        })
    }


}

//creando un método de login de clientes
const login_cliente = async function(req,res){
    var data = req.body;
    var clientes = await Cliente.find({email: data.email});
    if(clientes.length >= 1){
          if(clientes[0].estado){
              //Correo sí existe
              bcrypt.compare(data.password, clientes[0].password, async function(err,check){
                if(check){
                    res.status(200).send({token:jwt.createToken(clientes[0]),
                        cliente: clientes[0]
                    });

                }else{
                    res.status(200).send({data:undefined, message: 'la contraseña es incorrecta'});
                }
            })
          }else{
            res.status(200).send({data:undefined, message: 'su cuenta está desactivada'});
          }
    }else{
        res.status(200).send({data:undefined, message: 'el correo no existe'});
    }
}

//exportando el método testing
module.exports = {
    registro_cliente_ecommerce,
    login_cliente
}