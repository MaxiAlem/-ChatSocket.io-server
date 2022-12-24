import express  from "express"
import morgan from "morgan"
import { Server as SocketServer } from "socket.io"
import http from 'http'
import cors from 'cors'
import mongoose from "mongoose"
import bodyParser from "body-parser"

import router from "./routes/message.js"


//seteo mongoose
const url = 'mongodb+srv://root:root@cluster0.spzmk.mongodb.net/?retryWrites=true&w=majority'

mongoose.Promise = global.Promise

const app =express()
const PORT = 4000 //el 3000 es el que usa react

//creamos el server con el modulo http
const server = http.createServer(app)
const io = new SocketServer(server,{
    cors:{
        origin : '*'//indicamos que podemos acceder desde cualquier servidor
    }
})


//Middelware
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/api', router)

io.on('connection', (socket)=>{
    console.log(socket.id)
    console.log('cleinte conectado')

    socket.on('message', (message,nickname)=>{
        //enviar a todos los clientes
        socket.broadcast.emit('message', {
            body: message,
            from: nickname
        })
    })
})

//conexion a la BBDD y escuchamos la app a trave del puerto 4000
mongoose.connect(url,{useNewUrlParser:true}).then(()=>{
    console.log('conexion a la BDD succesfully')
    server.listen(PORT, ()=>{
        console.log('server ejecutandose en http://localhost:',PORT)
    })
})
//coneect es una promesa, cuanod se cumpla(then), hace algo