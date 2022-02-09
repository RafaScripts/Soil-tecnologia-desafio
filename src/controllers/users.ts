import knex from "../database/index";
import * as yup from "yup";

class UserController {

    async index(req: any, res: { json: (arg0: any[]) => any; }){
        const results = await knex('users');
        return res.json(results)
    }

}

export default new UserController();