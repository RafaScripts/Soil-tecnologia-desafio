import knex from "../database/index";
import * as yup from "yup";

/*interface user {
    userName: string,
    email: string,
    password: string,
    provider: boolean
}*/

module.exports = {
    async index(req: any, res: any){
        const results = await knex('users');

        return res.json(results);
    },

    async create (req: any, res: any) {
        const schema = yup.object().shape({
            userName: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().min(7).required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({error: "Validation fails"});
        }

        /*const exceptionUser = await knex('users').select({where: {email: req.body.email}})


        if (exceptionUser) {
            return res.status(400).json({error: "Usuario já registrado"});
        }*/

        const { id, userName, email, password, provider} = req.body;

        try {
            await knex('users').insert({
                userName,
                email,
                password,
                provider
            });
        }catch (e) {
            return res.status(400).json({ error: 'usuario já existente' });
        }



        return res.status(201).json({
            id,
            userName,
            email,
            provider
        });
    },

    async update(req: any, res: any){

        const { userName, email, password } = req.body
        const { id } = req.params


        await knex('users')
            .update({ userName, email, password })
            .where({ id })

        return res.status(200).json({ id, userName, email, password });
    },

    async delete(req: any, res: any){

        const { id } = req.params;

        await knex('users')
            .where({ id: id })
            .del();

        return res.status(200).json({ delete: 'users deleted' });
    }
}