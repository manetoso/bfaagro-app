import { Schema, model } from 'mongoose'

const CUENTASxCOBRAR = new Schema(
    {
        ID_VENTA: {
            type: Schema.Types.ObjectId,
            ref: 'VENTAS',
            required: true
        },
        CLIENTES: {
            CLIENTE_ORIGEN: {
                ID_CLIENTE: {
                    type: Schema.Types.ObjectId,
                    ref: 'CLIENTES',
                },
                NOMBRE_CLIENTE: {
                    type: String,
                    default: "BFA AGRO S.A de C.V"
                }
            },
            CLIENTE_DESTINO: {
                ID_CLIENTE: {
                    type: String,
                    ref: 'CLIENTES',
                },
                NOMBRE_CLIENTE: {
                    type: String,
                    required: true
                }
            }
        },
        FECHA_EMISION: {
            type: Date,
            default: Date.now(),
            required: true
        },
        FOLIO_VENTA: {
            type: String,
            required: true,
            unique: true
        },
        FOLIO_CXC: {
            type: String,
            required: true,
            unique: true
        },
        FECHA_VENCIMIENTO: {
            type: Date,
            default: Date.now(),
            required: true
        },
        TOTAL_VENTA: {
            type: Number,
            required: true
        },
        TOTAL_PAGADO: {
            type: Number,
            default: 0,
            required: true
        },
        SALDO: {
            type: Number,
            required: true,
        },
        OBSERVACIONES: {
            type: String,
            default: ''
        },
        ESTADO: {
            type: String,
            default: 'PENDIENTE'
        },
        MONEDA: {
            type: String,
            default: 'MXN'
        },
    },
    { timestamps: true }
)
CUENTASxCOBRAR.methods.toJSON = function () {
    const { __v, createdAt, updatedAt, ...cuentasxCobrar } = this.toObject()
    return cuentasxCobrar
}
export default model('CUENTASxCOBRAR', CUENTASxCOBRAR)
