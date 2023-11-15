import { secretKey, verify } from '../services/services.js';

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(403).send({ 
        auth: false, 
        message: 'Brak tokena autoryzacyjnego.' 
      });
    }

    verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(500).send({ 
          auth: false, 
          message: 'Błąd autoryzacji tokena.' 
        });
      }
      req.userId = decoded.id;
      next();
    });
  };

export const verifyPassword = (req, res, next) => {
  const { password } = req.body;
  let isNext = true;

  const passwordLength = password.length;

  if (passwordLength < 8 || passwordLength > 20) {
    isNext = false;
    return res.status(500).send({
      message: 'Hasło musi mieć min 8 i max 20 znaków'
    })
  }

  if (Number(password[0])) {
    isNext = false;
    return res.status(500).send({
      message: 'Hasło musi zaczynać się na literę'
    })
  }

  const numbersInPassword = [];
  for (const char of password) {
    if (Number(char)) {
      numbersInPassword.push(char);
    }
  }

  if (!numbersInPassword.length) {
    isNext = false;
    return res.status(500).send({
      message: 'Hasło musi zawierać liczbę'
    })
  }

  if (isNext === true) {
    next();
  }
}