import TIPOS_DOCUMENTOS from '../models/TiposDocumentos.js'

const generateNewFolio = async (TIPO_FOLIO = '') => {
    try {
        const folioOrden = await TIPOS_DOCUMENTOS.findOne({
            'TIPO_DOCUMENTO': 'TIPO_FOLIOS_' + TIPO_FOLIO
        })
        const consecutiveFolio = parseInt(folioOrden.VALOR) + 1
        await TIPOS_DOCUMENTOS.findByIdAndUpdate(folioOrden._id, { 
            "VALOR": consecutiveFolio
        })
        return TIPO_FOLIO + constructFolioString(consecutiveFolio.toString())
    } catch (error) {
        console.log(error);
    }
}

const constructFolioString = (NUMBER_FOLIO = '') => {
    switch (NUMBER_FOLIO.length) {
        case 1:
            return " 0000" + NUMBER_FOLIO
            break;
        case 2:
            return " 000" + NUMBER_FOLIO
            break;
        case 3:
            return " 00" + NUMBER_FOLIO
            break;
        case 4:
            return " 0" + NUMBER_FOLIO
            break;
        default:
            break;
    }
}

export { generateNewFolio }