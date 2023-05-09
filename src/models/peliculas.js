const mongoose = require('mongoose');

const peliculaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  duracion: { type: String, required: true },
  genero: { type: String, required: true }
});

module.exports = mongoose.model('Pelicula', peliculaSchema);
