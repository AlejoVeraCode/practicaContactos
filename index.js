//Importamos express desde express
import express from 'express'

//Importamos la funcion de agregar contacto desde el archivo de configuracion de Mongo
import { agregarContacto, Contacto, todosLosContactos, borrarContacto } from './mongo_config/mongo_config.js';

const app = express ()

//De donde sacaremos las vistas

app.set ('views', './Vistas/');
app.set ('view engine', 'ejs' )

//Recogemos los archivos estaticos 
app.use(express.static('./estilos'))

//Pasaremos los datos por post y codificaremos la url 
app.use(express.urlencoded({extended:true}))

//Escuchamos nuestra app desde el puerto 8000

app.listen('8000', (req, res) => {
    console.log ('aplicacion en http://localhost:8000')
})
app.get('/', async(req, res)=> {
    let contactos = await todosLosContactos(Contacto)
    res.render('index', {contactos})
})

app.post('/agregar', (req,res)=>{
    agregarContacto(req,res)
})

app.get('/borrar/:id', (req, res)=> {
    let id = req.params.id
    borrarContacto(Contacto, id, res)
})
