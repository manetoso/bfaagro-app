const validateRol = async (req = request, res = response, next) => {
    const section = req.header('section')
    const isAdmin = req.isAdmin
    if (!section) {
        return res.status(401).json({
            msg: 'Falta el el header section'
        })
    }
    try {
        if(!isAdmin){
            const authUser = req.authUser
            const valid = validateUserHaveRol(authUser.ROLES, section)
             // Añadimos información a la request para posteriores validaciones
            if (!valid){
                res.status(401).json({
                    msg: 'No se cuenta con los permisos suficientes'
                })
            }
        }
        next()
    } catch (error) {
        res.status(401).json({
            msg: 'Token no Valido'
        })
    }

}

const validateUserHaveRol = (userRoles = [], roleNeeded = '') => {
    try {
        const existRole = userRoles.find((role) => role.ROL == roleNeeded)
        if(existRole){
            return true
        }else {
            return false
        }
    } catch (error) {
        return false
    }
}

export { validateRol }