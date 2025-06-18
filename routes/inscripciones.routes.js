const express = require("express");
const router = express.Router();
const {
  inscribirAlumno,
  getInscripciones,
  actualizarInscripcion,
  eliminarInscripcion
} = require("../controllers/inscripciones.controller");

const { verifyToken } = require("../middlewares/auth.middleware");

router.use(verifyToken);

router.post("/", inscribirAlumno);
router.get("/", getInscripciones);
router.put("/:id", actualizarInscripcion);
router.delete("/:id", eliminarInscripcion);

module.exports = router;