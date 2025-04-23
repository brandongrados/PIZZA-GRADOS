var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CarritoSchema = Schema({
    cantidad : {type: Number, required: true},
    cliente: {type: Schema.ObjectId,ref:'cliente', required: true},
    producto: {type: Schema.ObjectId,ref:'producto', required: true},
    variedad : {type: Schema.ObjectId,ref:'variedad', required: true},
    createdAT: {type: Date, default: Date.now}
});

module.exports = mongoose.model('carrito',CarritoSchema);