import express from "express";
import body_parser from "body-parser";
import mascotas from "./src/routes/mascotas.routes.js";
import rutasAuth from "./src/routes/auth.routes.js";
import rutasUsuario from "./src/routes/users.routes.js"
import rutaCategorias from "./src/routes/categorias.routes.js"
import rutaRazas from "./src/routes/razas.routes.js"
import rutaGeneros from "./src/routes/generos.routes.js"
import { validarToken } from "./src/controllers/auth.controller.js";
import cors from "cors"

const server = express();
const PORT = 3333

server.use(body_parser.json());
server.use(body_parser.urlencoded({ extended: false}));

//ejs
server.set('view engine', 'ejs')
server.set('views', '/views')
server.use('/public', express.static('/public'))
server.get('/document', (req, res) => {
    res.render('document.ejs')
})

server.use(cors())

//rutas
server.use(rutasAuth)
server.use(validarToken, rutasUsuario)
server.use(validarToken, mascotas)
server.use(validarToken, rutaCategorias)
server.use(validarToken, rutaGeneros)
server.use(validarToken, rutaRazas)


server.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto http://localhost:${PORT}`);
});