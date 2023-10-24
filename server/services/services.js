import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';

export const { json } = bodyParser;
export const { hashSync, compareSync } = bcrypt;
export const {verify, sign} = jsonwebtoken;
export const secretKey = process.env.SECRET_KEY;