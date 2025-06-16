// models/Inscripcion.js
const mongoose = require("mongoose");

const InscripcionSchema = new mongoose.Schema({
  alumno: { type: mongoose.Schema.Types.ObjectId, ref: "Alumno" },
  materia: { type: mongoose.Schema.Types.ObjectId, ref: "Materia" },
  fecha: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Inscripcion", InscripcionSchema);