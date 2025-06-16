const express = require("express");
const router = express.Router();
const {
  createAlumno,
  getAlumnos,
  getAlumnoById,
  updateAlumno,
  deleteAlumno
} = require("../controllers/alumnos.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.use(verifyToken); // Protege todas las rutas

router.post("/", createAlumno);
router.get("/", getAlumnos);
router.get("/:id", getAlumnoById);
router.put("/:id", updateAlumno);
router.delete("/:id", deleteAlumno);

module.exports = router;