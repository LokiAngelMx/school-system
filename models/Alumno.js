const mongoose = require("mongoose");

const AlumnoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  matricula: { type: String, required: true, unique: true },
  correo: { type: String, required: true },
});

module.exports = mongoose.model("Alumno", AlumnoSchema);