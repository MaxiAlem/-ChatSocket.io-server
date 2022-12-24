import express from 'express'
import controller from '../controllers/message.js'

var router = express.Router()

//definimos rutas
router.post('/save', controller.save)//llamamos a la funcion del controller save para guardar el mensaje
router.get('/messages', controller.getMessages)


export default router