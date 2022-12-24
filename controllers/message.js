import message from "../models/message.js";
import Message from "../models/message.js";

const controller = {
    //fn para guaradr los mensahjes
    save: (req, res)=>{
        var params = req.body
        var message = new Message() 
        message.message = params.message 
        message.from = params.from

        message.save((error, messageStored) =>{
            if(error || !messageStored){
                return res.status(404).send({
                    status : 'Error',
                    message: 'No ha sido posible guardarr el mensaje '
                })
            }//sino entramos aca es un success
            return res.status(200).send({
                status:'Success',
                messageStored
            })
        })
    },

    //fn para obtener todos los msjs
    getMessages: (req,res)=>{
        var query = Message.find({}) //al no poner ninguna condicion en find, nos devuelve todos
        query.sort('-_id').exec((error,messages)=>{
            if(error){
                return res.status(500).send({
                    status : 'Error',
                    message: 'error al extraer los datos '
                })
            }
            if(!messages){
                return res.status(404).send({
                    status : 'Error',
                    message: 'No hay mensajes que mostrar'
                })
            }
            return res.status(200).send({
                status:'Success',
                messages
            })
           
        })
    }
}

export default controller