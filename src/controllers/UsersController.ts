// importação das blibiotecas
import knex from "../database/index";
import * as yup from "yup";
import bcrypt from "bcryptjs";


module.exports = {
    async index(req: any, res: any){
        /* busca em toda a tabela e exibe os resultados */
        const results = await knex('users');

        return res.json(results);
    },

    async create (req: any, res: any) {


        //verifica se os dados enviados no body correspondem ao que é pedido
        const schema = yup.object().shape({
            userName: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().min(7).required(),
        });

        // se os dados não forem validos retorna um erro
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({error: "Validation fails"});
        }

        // dados do corpo da requisição
        const { id, userName, email, provider} = req.body;
        

        // criptografa a senha
        const password_hash = await bcrypt.hash(req.body.password, 8);

        // é feita uma tentativa de adicionar os dados a tabela caso falhe retorna um erro
        try {
            await knex('users').insert({
                userName,
                email,
                password_hash,
                provider
            });
        }catch (e) {
            return res.status(400).json({ error: 'usuario já existente' });
        }


        // retorna os dados adicionados a tabela
        return res.status(201).json({
            id,
            userName,
            email,
            provider
        });
    },

    async update(req: any, res: any){

        // dados do corpo da requisição
        const { userName, email } = req.body
        const { id } = req.params

        // criptografa a senha
        const password = await bcrypt.hash(req.body.password, 8);

        // tenta atualizar os dados da tabela caso falhe retorna um erro
        try {
            await knex('users')
                .update({ userName, email, password })
                .where({ id: id })
        }catch (e) {
            return res.status(401).json('algo deu errado');
        }


        // retorna os dados atualizados
        return res.status(200).json({ id, userName, email, password });
    },

    async delete(req: any, res: any){

        //busca na tabela pelo id informado e deleta a row
        const { id } = req.params;

        await knex('users')
            .where({ id: id })
            .del();

        return res.status(200).json({ delete: 'users deleted' });
    }
}