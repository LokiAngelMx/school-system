const Inscripcion = require("../models/Inscripcion");
const Calificacion = require("../models/Calificacion");

// Crear inscripción
const inscribirAlumno = async (req, res) => {
  const { alumno, materia } = req.body;

  try {
    // 🔒 Verificar si ya existe esa inscripción
    const existente = await Inscripcion.findOne({ alumno, materia });

    if (existente) {
      return res.status(400).json({ message: "El alumno ya está inscrito en esta materia" });
    }

    const nueva = new Inscripcion({ alumno, materia });
    await nueva.save();

    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ message: "Error al inscribir", error: err.message });
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

// Actualizar inscripción
const actualizarInscripcion = async (req, res) => {
  const { alumno, materia } = req.body;
  const id = req.params.id;

  try {
    // Verificar si ya existe otra inscripción con los mismos datos
    const duplicado = await Inscripcion.findOne({
      alumno,
      materia,
      _id: { $ne: id } // excluye la que estás editando
    });

    if (duplicado) {
      return res.status(400).json({
        message: "El alumno ya está inscrito en esta materia"
      });
    }

    const updated = await Inscripcion.findByIdAndUpdate(id, { alumno, materia }, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Inscripción no encontrada" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar inscripción", error: err.message });
  }
};

// Eliminar inscripción
const eliminarInscripcion = async (req, res) => {
  try {
    const inscripcion = await Inscripcion.findByIdAndDelete(req.params.id);

    if (!inscripcion) {
      return res.status(404).json({ message: "Inscripción no encontrada" });
    }

    // 🧹 Eliminar calificación relacionada
    await Calificacion.deleteOne({
      alumno: inscripcion.alumno,
      materia: inscripcion.materia
    });

    res.json({ message: "Inscripción y calificación eliminadas" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar inscripción", error: err.message });
  }
};

module.exports = {
  inscribirAlumno,
  getInscripciones,
  actualizarInscripcion,
  eliminarInscripcion
};