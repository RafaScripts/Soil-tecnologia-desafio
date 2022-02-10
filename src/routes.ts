import express from "express";
//import knex from "./database";

const userController = require("./controllers/users");

const routes = express();

/* routes.get('/', (req, res) => {
    knex('users').then((results: any) => {
        return res.json(results);
    })
});*/

routes.get('/users', userController.index);
routes.post('/users', userController.create);
routes.put('/users/:id', userController.update);
routes.delete('/users/:id', userController.delete);

export default routes;