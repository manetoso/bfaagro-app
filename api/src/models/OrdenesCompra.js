import { Schema, model } from 'mongoose'

const ORDENES_COMPRAS = new Schema({
    PROVEEDOR: {
        ID_PROVEEDOR: {
            type: Schema.Types.ObjectId,
            ref: 'PROVEEDORES'
        },
        AGENTE: {
            type: String,
            required: true
        }
    },
    FECHA: {
        type: Date,
        default: Date.now().toString,
        required: true
    },
    ID_EMPRESA: {
        type: Schema.Types.ObjectId,
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
            UNIDAD_MEDIDA: {
                type: String,
                required: true
            },
            PRECIO_UNITARIO: {
                type: Number,
                required: true
            },
            TOTAL_UNITARIO: {
                type: Number,
                required: true
            },
        }
    ],
    IVA: {
        type: Number,
        required: true
    },
    TOTAL: {
        type: Number,
        required: true
    }
})

ORDENES_COMPRAS.methods.toJSON = function () {
    const { __v, ...ordenesCompras } = this.toObject()
    return ordenesCompras
}

export default model('ORDENES_COMPRAS', ORDENES_COMPRAS)
