import knex from "../database/index";
import * as yup from "yup";

/*interface user {
    userName: string,
    email: string,
    password: string,
    provider: boolean
}*/

module.exports = {
    async index(req: any, res: any) {
        const results = await knex('menu');

        return res.json(results);
    }
}