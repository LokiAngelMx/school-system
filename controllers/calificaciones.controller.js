const Calificacion = require("../models/Calificacion");
const Inscripcion = require("../models/Inscripcion");

// Crear o actualizar calificación
const asignarCalificacion = async (req, res) => {
  const { alumno, materia, calificacion } = req.body;
  try {
    const inscrito = await Inscripcion.findOne({ alumno, materia });

    if (!inscrito) {
      return res.status(400).json({
        message: "El alumno no está inscrito en esta materia"
      });
    }

    const existing = await Calificacion.findOneAndUpdate(
      { alumno, materia },
      { calificacion },
      { new: true, upsert: true }
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

// Actualizar calificación
const actualizarCalificacion = async (req, res) => {
  try {
    const updated = await Calificacion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Calificación no encontrada" });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar calificación" });
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
  actualizarCalificacion,
  eliminarCalificacion
};