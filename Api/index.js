'use strict'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql')
const conexion = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Stone_07',
    database : 'Notas'
})

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


//Endpoint usuario
app.post('/usuario',(req,res)=>{
    let datos = req.body
    conexion.query('insert into Usuario set ?',datos,(err,result,field)=>{
        if(err)
            return res.status(500).send(err)
        return res.status(200).send({mensaje : 'guardado con exito'})
    })

})
app.delete('/usuario/:id',(req,res)=>{
    let id = req.params.id
    console.log(id)
    conexion.query('delete from Usuario where id = ?',id,(err,result,field)=>{
        if(err) 
            return res.status(404).send(err)
        return res.status(202).send({ mensaje: 'Borrado exitosamente'})
    })
})
app.get('/usuario',(req,res)=>{
    conexion.query('select * from Usuario',(err,result,field)=>{
        if(err)
            return res.status(404).send({ mensaje : 'Recurso no encontrado'})
        return res.status(202).send({ usuarios : result }) 
    })
})

app.get('/usuario/:id',(req,res)=>{
    let id = req.params.id
    conexion.query('select * from Usuario where id = ? ',id,(err,result,field)=>{
        if(err)
            return res.status(404).send({ mensaje : 'Recurso no encontrado',err:err})
        return res.status(202).send({ usuario : result }) 
    })
})
app.put('/usuario/:id',(req,res)=>{
    let id = req.params.id
    conexion.query('update Usuario set ? where id = ?',[req.body, id],(err,result,field)=>{
        if(err)
            return res.status(500).send({mensaje : 'No se pudo actualizar',err : err})
        return res.status(200).send({ mensaje : 'Usuario actualizado'})
    })
})

app.get('/home',(req,res)=>{
    res.send({hola:'mundo'})
})




app.listen(3000, ()=>{
    console.log('Api desde http://localhost:3000')
})
    