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

})
app.delete('/usuario',(req,res)=>{
    
})
app.get('/usuario',(req,res)=>{
    conexion.query('select * from usuario',(err,result,field)=>{
        if(err)
            return res.status(404).send({ mensaje : 'Recurso no encontrado'})
        return res.status(202).send({ resultado }) 
    })
})

app.get('/usuario',(req,res)=>{
    conexion.query('select * from usuario',(err,result,field)=>{
        if(err)
            return res.status(404).send({ mensaje : 'Recurso no encontrado'})
        return res.status(202).send({ resultado }) 
    })
})
app.put('/usuario',(req,res)=>{
      
})

app.get('/home',(req,res)=>{
    res.send({hola:'mundo'})
})




app.listen(3000, ()=>{
    console.log('Api desde http://localhost:3000')
})