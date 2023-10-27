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