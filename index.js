
import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";
import dotenv from "dotenv/config";

const app = express();

// Conectar la Base de Datos
db.authenticate()
    .then(() => console.log("Base de Datos conectada."))
    .catch( error => console.log(error));

// Definir puerto
const port = process.env.port || 4000;

// Habilita PUG
app.set("view engine", "pug");

// Obtener el año actual
app.use( (req, res, next) => {
    res.locals.anioActual = new Date().getFullYear();
    res.locals.nombreSitio = "Agencia de viajes";
    return next();
});

// Agregar body parser para leer datos de Formulario, llena el request.body con la información del formulario
app.use(express.urlencoded({extended: true}));

// Definir la carpeta publica
app.use(express.static("public"))

// Agregar router
app.use("/", router);

app.listen( port, () => {
    console.log(`El servidor está funcionando en el puerto ${port}`);
})