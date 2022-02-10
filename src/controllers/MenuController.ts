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

        const { user_id } = req.query

        const query = knex('menu');

        if(user_id) {
            query.where({ user_id: user_id })
                .join('users', 'user_id', '=', 'menu.user_id')
                .select('menu.*', 'users.userName')

        }

        const results = await query;

        return res.json(results);
    }
}