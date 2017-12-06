'use strict'
const conexion = require('../conexion')
class NotasController 
{
    getNota(req,res)
    {
        let correo = req.correo
        let id = req.params.id
        let sql = 'select Nota.id,Nota.titulo,Nota.contenido,Nota.creada,Nota.actualizada from Nota inner join Usuario on Usuario.id = Nota.id_usuario where Nota.id =  ? and Usuario.correo = ?'
        conexion.query(sql
            ,[id,correo]
            ,(err,row,field)=>{
                if(err)
                    return res.status(500).send({mensaje:'No se encontro la nota',err})
                if(row.length > 0)
                    return res.status(200).send({Nota : row[0] })
                return res.status(500).send({mensaje:'No se encontro la nota'})
            })
    }
    getNotas(req,res)
    {
        let correo = req.correo
        let sql = 'select Nota.id,Nota.titulo,Nota.contenido,Nota.creada,Nota.actualizada from Nota inner join Usuario on Usuario.id = Nota.id_usuario where Usuario.correo = ?'
        conexion.query(sql
            ,[correo]
            ,(err,row,field)=>{
                if(err)
                    return res.status(500).send({mensaje:'No se encontro la nota',err})
                if(row.length > 0)
                    return res.status(200).send({Nota : row })
                return res.status(500).send({mensaje:'No se encontro la nota'})
            })
    }
    saveNota(req,res)
    {
        let correo = req.correo
        conexion.query('select id from Usuario where correo = ?',[correo],(err,row,field)=>{
            if(err)
                return res.status(500).send({mensaje:'No se encontro el usuario'})
            let id_usuario = row[0].id
            conexion.query('insert into Nota set ? ',req.body,(err,row,field)=>{
                if(err)
                    return res.status(500).send({mensaje:'No se pudo guardar'})
                conexion.query('update Nota set id_usuario = ? where id = ? ',[id_usuario,row.insertId],(err,row,field)=>{
                    if(err)
                        return res.status(500).send({mensaje:'No se pudo guardar',err})
                    return res.status(200).send({mensaje:'Nota guardada'})
                })        
            }) 
        })
    }

    updateNota(req,res)
    {
        let correo = req.correo
        conexion.query('select id from Usuario where correo = ?',[correo],(err,row,field)=>{
            if(err)
                return res.status(500).send({mensaje:'No se encontro el usuario'})
            let id_usuario = row[0].id
            let id = req.params.id
            conexion.query('update Nota set ? where id = ? and id_usuario = ?',[req.body,id,id_usuario],(err,row,field)=>{
                if(err)
                    return res.status(500).send({mensaje:'No se pudo guardar',err})
                return res.status(200).send({mensaje:'Nota actualizada'})
            }) 
        })
    }

    deleteNota(req,res)
    {
        let correo = req.correo
        conexion.query('select id from Usuario where correo = ?',[correo],(err,row,field)=>{
            if(err)
                return res.status(500).send({mensaje:'No se encontro el usuario'})
            let id_usuario = row[0].id
            let id = req.params.id
            conexion.query('delete from Nota where id = ? and id_usuario = ?',[id,id_usuario],(err,row,field)=>{
                if(err)
                    return res.status(500).send({mensaje:'No se pudo borrar',err})
                return res.status(200).send({mensaje:'Nota borrada con exito'})
            }) 
        })
    }



}

var Notas = new NotasController()

module.exports = Notas