import express from "express";
//import knex from "knex";

import userController from "./controllers/users";

const routes = express.Router();

routes.post('/users', (req, res) => userController.index);

export default routes;