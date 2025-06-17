const express = require("express");
const router = express.Router();
const {
  createMateria,
  getMaterias,
  getMateriaById,
  updateMateria,
  deleteMateria
} = require("../controllers/materias.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.use(verifyToken);

router.post("/", createMateria);
router.get("/", getMaterias);
router.get("/:id", getMateriaById);
router.put("/:id", updateMateria);
router.delete("/:id", deleteMateria);

module.exports = router;