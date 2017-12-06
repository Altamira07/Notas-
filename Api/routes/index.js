'use strict'
const express = require('express')
const api = express.Router()
const Usuario = require('../controller/UsuarioController')
const auth = require('../middleware/auth')
const User = require('../controller/UserController')
const Notas = require('../controller/NotasController')
//Rutas para usuario
api.put('/usuario',auth,Usuario.updateUsuario)

//Registo de usuario 
api.post('/signUp',User.signUp)
api.post('/signIn',User.signIn)
api.get('/pruebaToken',auth,(req,res)=>{
    res.status(200).send({mensaje:'tienes acceso'})

})
//Rutas notas 
api.get('/nota/:id',auth,Notas.getNota)
api.get('/nota',auth,Notas.getNotas)
api.post('/nota',auth,Notas.saveNota)
api.put('/nota/:id',auth,Notas.updateNota)
api.delete('/nota/:id',auth,Notas.deleteNota)

//Rutas para compartir notas :v

module.exports = api