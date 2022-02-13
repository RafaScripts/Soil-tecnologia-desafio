import jwt from 'jsonwebtoken';

import authConfig from "../config/auth";

import { promisify } from "util";

export default async (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({ error: 'Token not provided' });
    }

    const [, token] = authHeader.split(' ');

    try {

        // @ts-ignore
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);

        // @ts-ignore
        req.userId = decoded.id;

        return next();
    }catch (err) {
        return res.status(401).json({ error: "token invalid!" });
    }
};