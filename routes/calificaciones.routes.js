const express = require("express");
const router = express.Router();
const {
  asignarCalificacion,
  getCalificaciones,
  actualizarCalificacion,
  eliminarCalificacion
} = require("../controllers/calificaciones.controller");

const { verifyToken } = require("../middlewares/auth.middleware");

router.use(verifyToken);

router.post("/", asignarCalificacion);
router.get("/", getCalificaciones);
router.put("/:id", actualizarCalificacion);
router.delete("/:id", eliminarCalificacion);

module.exports = router;