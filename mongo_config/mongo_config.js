import mongoose, { model } from 'mongoose'

const {Schema} = mongoose

const conect =  'mongodb+srv://alejoveracode:Leon.0208@Cluster0.jo8hosd.mongodb.net/mongo_db_contacto?retryWrites=true&w=majority'
mongoose.connect(conect, {useNewUrlParser: true, useUnifiedTopology: true});

const contactoSchema = new Schema({
    nombre: String,
    numero:Number,
    direccion:String,
    email:String
})

const Contacto = mongoose.model('mongodbcontactos', contactoSchema)

const agregarContacto = (req, res) => {

    const contacto = new Contacto({
        nombre: req.body.nombre,
        numero :Number(req.body.numero),
        direccion:req.body.direccion,
        email:req.body.email
    })
    contacto.save()
    .then(re => {
        res.redirect('/')
    })
}

const todosLosContactos = async (modelo) => {
    const resultados = await modelo.find({}).exec();
    return resultados;
};

const borrarContacto = (modelo, id, res) => {
    modelo.deleteOne({_id: id}, (err,doc)=> {
        res.redirect('/')
    })
}

export {Contacto, agregarContacto, todosLosContactos, borrarContacto}
