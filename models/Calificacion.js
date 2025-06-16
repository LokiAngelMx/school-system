// models/Calificacion.js
const mongoose = require("mongoose");

const CalificacionSchema = new mongoose.Schema({
  alumno: { type: mongoose.Schema.Types.ObjectId, ref: "Alumno" },
  materia: { type: mongoose.Schema.Types.ObjectId, ref: "Materia" },
  calificacion: Number,
});

module.exports = mongoose.model("Calificacion", CalificacionSchema);