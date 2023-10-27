import { secretKey, sign, hashSync, compareSync  } from '../services/services.js';
import {User} from '../models/user.js';

export function hashPassword(password) {
   return hashSync(password, 8);
}

export function getToken(user) {
   return sign({ id: user.id }, secretKey, {
        expiresIn: 86400, 
      });
}

export function comparePasword(password, user) {
    return compareSync(password, user.password);
}

export async function findUser({email, username}) {
    const user = email 
    ? await User.findOne({ where: { email } })
    : await User.findOne({where: { username } });

    return user;
}

export async function createNewUser({username, email}, password) {
    const user = await User.create({
        username, email, password,
    });
    return user;
}