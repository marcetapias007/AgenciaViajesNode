import express from "express";
import { paginaInicio, paginaNosotros, paginaViajes, paginaTestimoniales, paginaDetalleViaje } from "../controllers/controllerPaginas.js";
import { GuardarTestimonial } from "../controllers/controllerTestimonial.js";

const router = express.Router();

router.get("/", paginaInicio);

router.get("/nosotros", paginaNosotros);

router.get("/viajes", paginaViajes);

router.get("/viajes/:slug", paginaDetalleViaje);   // :slug  => puede tener cualquier valor o nombre, no necesarimente "slug", este parametro se pasa al controller

router.get("/testimoniales", paginaTestimoniales);
router.post("/testimoniales", GuardarTestimonial);


export default router;