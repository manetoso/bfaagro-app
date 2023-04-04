import { response } from 'express'

const serverErrorMessage = (res = response, body = {}, status = 500) => {
  if (body !== {}) {
    console.log(body)
    return res.status(status).json({
      msg: 'Hubo un error en el servidor',
      error: body
    })
  } else {
    return res.status(status).json({
      msg: 'Hubo un error en el servidor'
    })
  }
}

const serverOkMessage = (res = response, body = {}, status = 200) => {
  if (body !== {}) {
    return res.status(status).json({
      body
    })
  } else {
    return res.status(status).json({
      ok: true
    })
  }
}

export { serverErrorMessage, serverOkMessage }
