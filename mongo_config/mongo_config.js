//Importamos mongoDB
import mongoose from 'mongoose'

//Hacemos una extracccion del objeto (object extractory)
const {Schema} = mongoose


//Conectamos con la url de la base de datos.
const conexion = 'mongodb+srv://alejoveracode:Leon.0208@Cluster0.jo8hosd.mongodb.net/mongo_db_contacto?retryWrites=true&w=majority'

//Configuracion de mongoose
mongoose.connect(conexion, {useNewUrlParser: true, useUnifiedTopology: true});

//Plantilla de la base de datos
const contactoSchema = new Schema ({
    nombre: String,
    numero: Number,
    direccion: String,
    email: String
})

//Hacemos un modelo con la plantilla
const Contacto = mongoose.model('mongodbcontactos', contactoSchema)


const agregarContacto = (req, res) => {
    const contacto = new Contacto ({
        nombre: req.body.nombre,
        numero: Number (req.body.numero),
        direccion: req.body.direccion,
        email: req.body.email
    })
    contacto.save()
    .then (re => {
        res.redirect('/')
    }) .catch(console.error)
}

//Funcion para que muestre los contactos agregados
const todosLosContactos = async (modelo) => {
    const resultados = await modelo.find({}).exec();
    return resultados;
};

//Funcion para que borre los contactos
const borrarContacto = async (modelo, id, res) => {
    try {
        const resultado = await modelo.deleteOne({_id: id});
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al eliminar el contacto');
    }
}

export {Contacto, agregarContacto, todosLosContactos, borrarContacto}
