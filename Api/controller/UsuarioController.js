'use strict'
const conexion = require('../conexion')
class UsuarioController 
{
    getUsuarios(req,res)
    {
        conexion.query('select * from Usuario',(err,result,field)=>{
            if(err)
                return res.status(404).send({ mensaje : 'Recurso no encontrado'})
            return res.status(202).send({ usuarios : result }) 
        })
    }
    getUsuario(req,res)
    {
        let id = req.params.id
        conexion.query('select * from Usuario where id = ? ',id,(err,result,field)=>{
            if(err)
                return res.status(404).send({ mensaje : 'Recurso no encontrado',err:err})
            return res.status(202).send({ usuario : result }) 
        })
    }   
    saveUsuario(req,res)
    {
        let datos = req.body
        conexion.query('insert into Usuario set ?',datos,(err,result,field)=>{
            if(err)
                return res.status(500).send(err)
            return res.status(200).send({mensaje : 'guardado con exito'})
        })
    }
    updateUsuario(req,res)
    {
        conexion.query('update Usuario set ? where correo = ?',[req.body, req.correo],(err,result,field)=>{
            if(err)
                return res.status(500).send({mensaje : 'No se pudo actualizar',err : err})
            return res.status(200).send({ mensaje : 'Usuario actualizado'})
        })
    }
    deleteUsuario(req,res)
    {
        let id = req.params.id
        console.log(id)
        conexion.query('delete from Usuario where id = ?',id,(err,result,field)=>{
            if(err) 
                return res.status(404).send(err)
            return res.status(202).send({ mensaje: 'Borrado exitosamente'})
        })
    }
}

var Usuario = new UsuarioController()

module.exports = Usuario