// models/Alumno.js
const mongoose = require("mongoose");

const AlumnoSchema = new mongoose.Schema({
  nombre: String,
  matricula: String,
  correo: String,
});

module.exports = mongoose.model("Alumno", AlumnoSchema);