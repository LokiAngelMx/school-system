// models/Materia.js
const mongoose = require("mongoose");

const MateriaSchema = new mongoose.Schema({
  nombre: String,
  clave: String,
  profesor: String,
});

module.exports = mongoose.model("Materia", MateriaSchema);