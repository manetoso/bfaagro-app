import { request, response } from 'express'

const hola = async (req = request, res = response) => {
  try {
    res.status(200).json({
      msg: 'tuano mane vamos por una lupillos'
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Hubo un error, probablemente del Servidor'
    })
  }
}
export default hola
