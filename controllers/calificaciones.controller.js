const Calificacion = require("../models/Calificacion");

// Crear o actualizar calificación
const asignarCalificacion = async (req, res) => {
  const { alumno, materia, calificacion } = req.body;
  try {
    // Actualizar si ya existe
    const existing = await Calificacion.findOneAndUpdate(
      { alumno, materia },
      { calificacion },
      { new: true, upsert: true } // crear si no existe
    );
    res.status(201).json(existing);
  } catch (err) {
    res.status(500).json({ message: "Error al asignar calificación", error: err.message });
  }
};

// Obtener todas
const getCalificaciones = async (req, res) => {
  try {
    const calificaciones = await Calificacion.find()
      .populate("alumno", "nombre matricula")
      .populate("materia", "nombre clave profesor");
    res.json(calificaciones);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener calificaciones", error: err.message });
  }
};

// Eliminar
const eliminarCalificacion = async (req, res) => {
  try {
    const result = await Calificacion.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Calificación no encontrada" });
    res.json({ message: "Calificación eliminada" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar", error: err.message });
  }
};

module.exports = {
  asignarCalificacion,
  getCalificaciones,
  eliminarCalificacion
};