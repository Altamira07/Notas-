'use strict'
const service = require('../service')
function isAuth(req,res,next)
{
    if(!req.headers.authorization)
    {
        return res.status(403).send({mensaje:'no tienes autorizacion'})
    }
    const token = req.headers.authorization.split(" ")[0]
    service.decodeToken(token)
        .then(response =>{
            req.correo = response
            next()
        })
        .catch(response =>{
            res.status(response.status).send(response.mensaje)
        })    

}

module.exports  = isAuth 