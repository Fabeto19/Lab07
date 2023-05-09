const express = require('express');
const mongoose = require('mongoose');
const app = express();



// URL de conexión a la base de datos
const url = 'mongodb://0.0.0.0:27017/peliculasdb';

// Conectarse a la base de datos
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch((error) => {
    console.log('Error al conectar a la base de datos:', error);
  });

// Importar el modelo de película
const Pelicula = require('./models/peliculas');

// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');

// Ruta principal
app.get('/', async (req, res) => {
  try {
    // Obtener las películas de la base de datos
    const peliculas = await Pelicula.find();

    // Renderizar la vista con los datos de las películas
    res.render('index', { peliculas });
  } catch (error) {
    console.log('Error al obtener las películas:', error);
    res.status(500).send('Error interno del servidor');
  }
});
// ...
app.use(express.static('public'));
// Importar body-parser para procesar los datos del formulario
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para mostrar el formulario de ingreso de películas
app.get('/agregar', (req, res) => {
  res.render('agregar');
});

// Ruta para procesar el formulario y guardar los datos en la base de datos
app.post('/agregar', async (req, res) => {
  try {
    // Crear una nueva instancia del modelo Pelicula con los datos del formulario
    const nuevaPelicula = new Pelicula({
      nombre: req.body.nombre,
      duracion: req.body.duracion,
      genero: req.body.genero
    });

    // Guardar la nueva película en la base de datos
    await nuevaPelicula.save();

    console.log('Película guardada correctamente');
    res.redirect('/');
  } catch (error) {
    console.log('Error al guardar la película:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// ...


// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor web iniciado en el puerto 3000');
});
