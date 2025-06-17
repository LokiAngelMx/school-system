const Inscripcion = require("../models/Inscripcion");

// Crear inscripción
const inscribirAlumno = async (req, res) => {
  const { alumno, materia } = req.body;
  try {
    const inscripcion = new Inscripcion({ alumno, materia });
    await inscripcion.save();
    res.status(201).json(inscripcion);
  } catch (err) {
    res.status(500).json({ message: "Error al inscribir alumno", error: err.message });
  }
};

// Listar todas las inscripciones
const getInscripciones = async (req, res) => {
  try {
    const inscripciones = await Inscripcion.find()
      .populate("alumno", "nombre matricula")
      .populate("materia", "nombre clave profesor");
    res.json(inscripciones);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener inscripciones", error: err.message });
  }
};

// Eliminar inscripción
const eliminarInscripcion = async (req, res) => {
  try {
    const inscripcion = await Inscripcion.findByIdAndDelete(req.params.id);
    if (!inscripcion) return res.status(404).json({ message: "Inscripción no encontrada" });
    res.json({ message: "Inscripción eliminada" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar", error: err.message });
  }
};

module.exports = {
  inscribirAlumno,
  getInscripciones,
  eliminarInscripcion
};