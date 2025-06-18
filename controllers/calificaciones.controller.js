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
  const { alumno, materia, calificacion } = req.body;
  const id = req.params.id;

  try {
    // 1. Validar que exista la inscripción alumno-materia
    const inscrito = await Inscripcion.findOne({ alumno, materia });
    if (!inscrito) {
      return res.status(400).json({
        message: "El alumno no está inscrito en esta materia"
      });
    }

    // 2. Verificar si ya existe otra calificación para este alumno-materia distinta de la actual
    const duplicado = await Calificacion.findOne({
      alumno,
      materia,
      _id: { $ne: id }
    });

    if (duplicado) {
      return res.status(400).json({
        message: "Ya existe una calificación para este alumno en esta materia"
      });
    }

    // 3. Actualizar la calificación
    const updated = await Calificacion.findByIdAndUpdate(
      id,
      { alumno, materia, calificacion },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Calificación no encontrada" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar calificación", error: err.message });
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