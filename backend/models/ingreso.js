var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var IngresoSchema = Schema({
    proveedor : {type: String, required: true},//f
    ncomprobante : {type: String, required: true},//f
    documento : {type: String, required: true},//f
    monto_total : {type: String, required: true},//f
    serie : {type: Number, required: false},//nf
    monto_resultante : {type: String, required: true},//nf
    usuario : {type: Schema.ObjectId,ref:'usuario', required: true},//nf
    
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('ingreso',IngresoSchema);