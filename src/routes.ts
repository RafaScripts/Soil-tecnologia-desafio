import express from "express";
//import knex from "./database";

const userController = require("./controllers/UsersController");
const MenuController = require("./controllers/MenuController");
const SessionController = require("./controllers/SessionController");
import authMiddleware from "./middlewares/auth";

const routes = express();

/* routes.get('/', (req, res) => {
    knex('users').then((results: any) => {
        return res.json(results);
    })
});*/



// rota de login
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

// Rotas do CRUD de Usuarios
routes.get('/users', userController.index)
    .post('/users', userController.create)
    .put('/users/:id', userController.update)
    .delete('/users/:id', userController.delete);

// Rotas do CRUD de menu
routes.get('/users/menu/:user_id', MenuController.index)
    .post('/users/menu/:user_id', MenuController.create)
    .put('/users/menu/:user_id', MenuController.update)
    .delete('/users/menu/:user_id', MenuController.delete);

export default routes;