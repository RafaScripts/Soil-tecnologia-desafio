import knex from "../database/index";
import jwt from 'jsonwebtoken';
import authConfig from "../config/auth";
import * as yup from "yup";
import bcrypt from "bcryptjs";

module.exports = {
    async store(req: any, res: any, next: any){

        //const bd = await knex('users');

        const schema = yup.object().shape({
            email: yup.string().email().required(),
            password: yup.string().required()
        });

        const { email, password } = req.body

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: "Validation fails" });
        }

        const user = await knex('users').first('*').where({ email });



        if(!user){
            return res.status(400).json("User not Found");
        }

        const valid = await  bcrypt.compare(password, user.password_hash);

        if(!valid){
            return res.status(400).json("Password does not match");
        }

        const { id, name } = user;

        return res.json({
            user: {
                id,
                name,
                email,
            },
            token: jwt.sign({id}, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            }),
        });

    }
}