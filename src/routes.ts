import express from "express";
//import knex from "./database";

const userController = require("./controllers/users");
const MenuController = require("./controllers/MenuController");

const routes = express();

/* routes.get('/', (req, res) => {
    knex('users').then((results: any) => {
        return res.json(results);
    })
});*/

// Rotas do CRUD de Usuarios
routes.get('/users', userController.index)
    .post('/users', userController.create)
    .put('/users/:id', userController.update)
    .delete('/users/:id', userController.delete);

// Rotas do CRUD de menu
routes.get('/menu', MenuController.index).post('/menu', MenuController.create);

export default routes;