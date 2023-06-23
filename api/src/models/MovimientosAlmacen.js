import { Schema, model } from 'mongoose'

const MOVIMIENTOS_ALMACEN = new Schema({
    MOVIMIENTO: {
        ID_MOVIMIENTO: {
            type: Schema.Types.ObjectId,
            ref: 'TIPOS_DOCUMENTOS'
        },
        MOVIMIENTO: {
            type: String,
            required: true
        }
    },
    FECHA: {
        type: Date,
        default: Date.now(),
        required: true
    },
    PRODUCTOS: [
        {
            _id: false,
            ID_PRODUCTO: {
                type: Schema.Types.ObjectId,
                ref: 'PRODUCTOS',
                required: true
            },
            NOMBRE_PRODUCTO: {
                type: String,
                required: true
            },
            CANTIDAD: {
                type: Number,
                required: true
            },
        }
    ]
}, { timestamps: true })

MOVIMIENTOS_ALMACEN.methods.toJSON = function () {
    const { __v, createdAt, updatedAt, ...movimientoAlmacen } = this.toObject()
    return movimientoAlmacen
}

export default model('MOVIMIENTOS_ALMACEN', MOVIMIENTOS_ALMACEN)
