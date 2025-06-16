const Alumno = require("../models/Alumno");

// Crear alumno
const createAlumno = async (req, res) => {
  try {
    const alumno = new Alumno(req.body);
    await alumno.save();
    res.status(201).json(alumno);
  } catch (err) {
    res.status(500).json({ message: "Error al crear alumno", error: err.message });
  }
};

// Listar todos
const getAlumnos = async (req, res) => {
  try {
    const alumnos = await Alumno.find();
    res.json(alumnos);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener alumnos", error: err.message });
  }
};

// Obtener uno
const getAlumnoById = async (req, res) => {
  try {
    const alumno = await Alumno.findById(req.params.id);
    if (!alumno) return res.status(404).json({ message: "Alumno no encontrado" });
    res.json(alumno);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

// Actualizar
const updateAlumno = async (req, res) => {
  try {
    const alumno = await Alumno.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!alumno) return res.status(404).json({ message: "Alumno no encontrado" });
    res.json(alumno);
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar", error: err.message });
  }
};

// Eliminar
const deleteAlumno = async (req, res) => {
  try {
    const alumno = await Alumno.findByIdAndDelete(req.params.id);
    if (!alumno) return res.status(404).json({ message: "Alumno no encontrado" });
    res.json({ message: "Alumno eliminado" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar", error: err.message });
  }
};

module.exports = {
  createAlumno,
  getAlumnos,
  getAlumnoById,
  updateAlumno,
  deleteAlumno
};