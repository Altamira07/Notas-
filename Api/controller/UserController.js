
'use strict'
const conexion = require('../conexion')
const md5 = require('md5')
const service = require('../service')
function signUp(req,res)
{
    let correo = req.body.correo
    let contrasena = md5(req.body.contrasena)
    conexion.query('insert into Usuario set ? ',{correo : correo,contrasena:contrasena },(err,row,field)=>{
        if(err)
            return res.status(500).send({mensaje : 'no se ha podido crear el usuari',error:err})
        let token = service.createToken(correo,contrasena)
        return res.status(200).send({mensaje:'Creado con exito',token: token})
    })

}

function signIn (req,res)
{ 
    let correo = req.body.correo
    let contrasena = md5(req.body.contrasena)
    conexion.query('select * from Usuario where correo = ? and contrasena = ? ',[correo,contrasena],(err,row,field)=>{
        if(err)
            return res.status(500).send({mensaje:'Usuario y/o contraseña incorrectos',data:err})
        if(row.length > 0)
        {
            let token = service.createToken(correo,contrasena)
            return res.status(200).send({mensaje:'Te has logueado correctamente',toke:token})  
        }
        return res.status(500).send({mensaje:'Usuario y/contraseña incorrectos'})  
    })
}


module.exports = { signUp,signIn }