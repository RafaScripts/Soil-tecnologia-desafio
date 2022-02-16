import knex from "../database/index";
//import * as yup from "yup";

/*interface user {
    userName: string,
    email: string,
    password: string,
    provider: boolean
}*/

module.exports = {
    async index(req: any, res: any) {

        const { user_id } = req.params

        const query = knex('menu');

        if(user_id) { await query.where({ user_id: user_id})
            .join('users', 'users.id', '=', 'menu.user_id')
            .select('menu.*', 'users.userName')
        }

        const results = await query;

        return res.json(results);
    },

    async create(req: any, res: any){
        const { user_id } = req.params

        const { week, time, protein, carb, vegetal, greens, fruits, creation } = req.body

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
                    creation,
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

    },

    async update(req: any, res: any){

        const { id } = req.params

        const { week, time, protein, carb, vegetal, greens, fruits } = req.body

        await knex('menu').update({
            week,
            time,
            protein,
            carb,
            vegetal,
            greens,
            fruits
        }).where({ id: id })

        return res.status(200).json({ time,
            protein,
            carb,
            vegetal,
            greens,
            fruits,
            id });

    },

    async delete(req: any, res: any){

        const { id } = req.params;

        await knex('menu').del().where({ id: id });

        return res.status(200).json({ delete: 'menu deleted' });
    }
}
