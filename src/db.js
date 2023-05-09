// Importar la biblioteca de Mongoose
const mongoose = require('mongoose');

// URL de conexión a la base de datos
const url = 'mongodb://0.0.0.0:27017/peliculasdb';

// Definir el esquema de película
const peliculaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  duracion: { type: String, required: true },
  genero: { type: String, required: true }
});

// Crear el modelo de película
const Pelicula = mongoose.model('Pelicula', peliculaSchema);

// Función asincrónica para insertar películas
async function insertarPeliculas() {
  try {
    // Conectarse a la base de datos
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

    // Crear las películas
    const peliculas = [
      { nombre: 'Titanic', duracion: '3 horas', genero: 'Drama' },
      { nombre: 'Jurassic Park', duracion: '2 horas 7 minutos', genero: 'Aventura' },
      { nombre: 'The Avengers', duracion: '2 horas 23 minutos', genero: 'Acción' },
      { nombre: 'The Shawshank Redemption', duracion: '2 horas 22 minutos', genero: 'Drama' },
      { nombre: 'Pulp Fiction', duracion: '2 horas 34 minutos', genero: 'Crimen' }
    ];

    // Insertar las películas en la base de datos
    await Pelicula.insertMany(peliculas);

    console.log('Las películas se han insertado correctamente.');

    // Desconectarse de la base de datos
    mongoose.disconnect();
  } catch (error) {
    console.log('Ha ocurrido un error:', error);
  }
}

// Llamar a la función para insertar las películas
insertarPeliculas();
