const express = require("express");
const router = express.Router();
const {
  inscribirAlumno,
  getInscripciones,
  eliminarInscripcion
} = require("../controllers/inscripciones.controller");

const { verifyToken } = require("../middlewares/auth.middleware");

router.use(verifyToken);

router.post("/", inscribirAlumno);
router.get("/", getInscripciones);
router.delete("/:id", eliminarInscripcion);

module.exports = router;