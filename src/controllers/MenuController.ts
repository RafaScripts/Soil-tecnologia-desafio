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
            query.where({ user_id : user_id})
                .join('users', 'user_id', '=', 'menu.user_id')
                .select('menu.*', 'users.userName')

        }

        const results = await query;

        return res.json(results);
    },

    async create(req: any, res: any){
        const { user_id } = req.query

        const { week, time, protein, carb, vegetal, greens, fruits } = req.body

        try {

            if(user_id){
                await knex('menu').insert({
                    week,
                    time,
                    protein,
                    carb,
                    vegetal,
                    greens,
                    fruits,
                    user_id
                })
            }

        }catch (e) {
            return res.status(401).json('user_id não foi informado');
        }




        return res.status(201).json({ week,
            time,
            protein,
            carb,
            vegetal,
            greens,
            fruits,
            user_id });

    }
}