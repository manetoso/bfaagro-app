import jsonwebtoken from 'jsonwebtoken'

const generateJWT = async( id = '' ) => {
    return new Promise( (resolve, reject) => {
        const payload = {id}
        jsonwebtoken.sign(payload, process.env.SECRETKEY, {
            expiresIn: '4h'
        },(error, token) => {
            if(error){
              reject('Error al crear el token')  
            }else{
                resolve(token)
            }
        })
    } )
}

export {generateJWT}