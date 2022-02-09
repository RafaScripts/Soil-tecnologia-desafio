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
        /*const schema = yup.object().shape({
            userName: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({error: "Validation fails"});
        }

        const exceptionUser = await knex('users').select({where: {email: req.body.email}})


        if (exceptionUser) {
            return res.status(400).json({error: "Usuario já registrado"});
        }*/

        const { id, userName, email, password, provider} = req.body;

         await knex('users').insert({
             userName,
             email,
             password,
             provider
         });

        return res.json({
            id,
            userName,
            email,
            provider
        });
    }
}