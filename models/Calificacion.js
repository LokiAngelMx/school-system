const mongoose = require("mongoose");

const CalificacionSchema = new mongoose.Schema({
  alumno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Alumno",
    required: true
  },
  materia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Materia",
    required: true
  },
  calificacion: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  }
});

module.exports = mongoose.model("Calificacion", CalificacionSchema);