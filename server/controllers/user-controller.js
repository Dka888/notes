import { hashPassword, getToken, comparePasword, findUser, createNewUser } from '../services/user-services.js';

const register = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = hashPassword(password);
  
    try {
      const userInBase = await findUser({email, password});
      if(userInBase) {
        res.status(404).send('Nie udało się zarejestrować');
        return;
      }
      const user = await createNewUser({ username, email }, hashedPassword);
      const token = getToken(user);
      res.status(200).send({ auth: true, token });
    } catch (error) {
      console.log(error)
      res.status(500).send('Błąd podczas rejestracji.');
    }
  }

const login = async (req, res) => {
    const { email, password, username } = req.body;
    try {
      let user = await findUser({ email, username });
      if (!user) {
        return res.status(404).send('Użytkownik nie znaleziony.');
      }

      const passwordIsValid = comparePasword(password, user);
      if (!passwordIsValid) {
        return res.status(401).send({ auth: false, token: null });
      }

      const token = getToken(user);
      user = {username: user.username, email: user.email};
      res.status(200).send({ auth: true, user, token });
    } catch (error) {
      res.status(500).send('Błąd podczas logowania.');
    }
  }

  const deleteUser = async (req, res) => {
    const id  = req.id;
    try {
      await User.destroy({ where:{ id } }); 
      res.status(200).send('User deleted'); 
    } catch (e) {
      console.error(e);
      res.status(500).send('Internal Server Error'); 
    }
  };
  
  

const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.send(users);
  } catch(e) {

  }
}

  export const authUser = {
    register,
    login, 
    deleteUser,
    getAllUsers,
  }
