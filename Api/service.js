'use strict'
const jwt = require('jwt-simple')
const moment = require('moment')

function createToken(correo,contrasena)
{
    const playload = {
        correo : correo,
        contrasena : contrasena,
        iat: moment().unix(),
        exp: moment().add(14,'days').unix(),
    }
    return jwt.encode(playload,'miclavedetokens')
}

function decodeToken(token)
{
    const decode = new Promise((resolve,reject)=>{
        try {
            const playload = jwt.decode(token,'miclavedetokens')
            if(playload.exp <= moment().unix())
            {
                reject({
                    status:401,
                    mensaje:'El token ha expirado'
                })
            }
            let correo = playload.correo
            resolve( correo )
        } catch (error) {
            reject({status:500,mensaje:'Token ivalido'})
        }
    })   
    return decode
}

module.exports = {createToken,decodeToken}