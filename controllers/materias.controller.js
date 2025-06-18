const Materia = require("../models/Materia");
const Inscripcion = require("../models/Inscripcion");
const Calificacion = require("../models/Calificacion");

// Crear materia
const createMateria = async (req, res) => {
  try {
    const materia = new Materia(req.body);
    await materia.save();
    res.status(201).json(materia);
  } catch (err) {
    res.status(500).json({ message: "Error al crear materia", error: err.message });
  }
};

// Listar todas las materias
const getMaterias = async (req, res) => {
  try {
    const materias = await Materia.find();
    res.json(materias);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener materias", error: err.message });
  }
};

// Obtener materia por ID
const getMateriaById = async (req, res) => {
  try {
    const materia = await Materia.findById(req.params.id);
    if (!materia) return res.status(404).json({ message: "Materia no encontrada" });
    res.json(materia);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

// Actualizar materia
const updateMateria = async (req, res) => {
  try {
    const materia = await Materia.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!materia) return res.status(404).json({ message: "Materia no encontrada" });
    res.json(materia);
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar", error: err.message });
  }
};

// Eliminar materia y sus inscripciones y calificaciones
const deleteMateria = async (req, res) => {
  try {
    const materia = await Materia.findByIdAndDelete(req.params.id);

    if (!materia) {
      return res.status(404).json({ message: "Materia no encontrada" });
    }

    await Inscripcion.deleteMany({ materia: req.params.id });
    await Calificacion.deleteMany({ materia: req.params.id });

    res.json({ message: "Materia, inscripciones y calificaciones eliminadas" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar materia", error: err.message });
  }
};

module.exports = {
  createMateria,
  getMaterias,
  getMateriaById,
  updateMateria,
  deleteMateria
};