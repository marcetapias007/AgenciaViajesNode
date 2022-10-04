import { Viaje } from "../models/Viaje.js";
import { Testimonial } from "../models/Testimoniales.js";

const paginaInicio = async (req, res) => {   //request -> lo que enviamos  || response -> lo que nos devuelve o responde

    // Consultar 3 viajes del Modelo Viaje


    // Poner las consultas en un array
    const promiseDB = [];
    promiseDB.push(Viaje.findAll({ limit: 3 }));
    promiseDB.push(Testimonial.findAll({ limit: 3 }));

    try {
        // Ejecuta las consultas de forma simultanea evitando que se ejecute una y luego la siguiente ahorrando tiempo de carga
        const resultado = await Promise.all(promiseDB);
        res.render("inicio",{
            pagina: "Inicio",
            clase: "home",
            viajes: resultado[0],
            testimoniales: resultado[1]
        });   //Visualiza en pantalla
    } catch (error) {
        console.log(error);
    }

    
};

const paginaNosotros = (req, res) => {   //request -> lo que enviamos  || response -> lo que nos devuelve o responde
    res.render("nosotros", {
        pagina: "Nosotros"
    });   //Visualiza en pantalla
};

const paginaViajes = async (req, res) => {   //request -> lo que enviamos  || response -> lo que nos devuelve o responde
    
    // Consultar DB
    const viajes = await Viaje.findAll();

    //console.log(viajes);
    
    res.render("viajes", {
        pagina: "Próximos viajes",
        viajes
    });   //Visualiza en pantalla
};

const paginaTestimoniales = async (req, res) => {   //request -> lo que enviamos  || response -> lo que nos devuelve o responde
    
    
    try {
        const testimoniales = await Testimonial.findAll();
        res.render("testimoniales", {
            pagina: "Testimoniales",
            testimoniales
        });   //Visualiza en pantalla
    } catch (error) {
        console.log(error);
    }
};

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {   //request -> lo que enviamos  || response -> lo que nos devuelve o responde
    const  { slug } = req.params;
    //console.log(req.params);
    try {
        const viaje = await Viaje.findOne({ where: { slug }});   // El objeto original es: slug: slug  ===> pero queda como slug
        res.render("destino", {
            pagina: "Informaición viaje",
            viaje
        })
    } catch (error) {
        console.log(error);
    }
};

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}