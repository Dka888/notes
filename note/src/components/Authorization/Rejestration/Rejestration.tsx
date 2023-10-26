import { useForm, SubmitHandler } from "react-hook-form";
import './Rejestration.scss';
import { User } from "../../../utils/Types";
import { registerUser } from "../../../API/api";
import { useState } from "react";
import { checkValidEmail } from "../../../utils/utils";

interface IFormInput {
    username: string,
    email: string,
    password: string
}


export function Rejestration() {
    const { register, handleSubmit } = useForm<IFormInput>()
    const [message, setMessage] = useState('');

    const onSubmit: SubmitHandler<IFormInput> = async(data: User) => {
        
        const { username, email, password } = data;
        const isValidEmail = checkValidEmail(email);

        if(!isValidEmail) {
            setMessage('Wpisz poprawny email');
            return;
        }

        const response = await registerUser({ username, email, password });
        if(response?.status === 200) {
            setMessage('Rejestracja udana');
            localStorage.setItem('UserValidation', response.data);
        }
        if(response?.status === 404) {
            setMessage('Zmień nazwę użytkownika lub email');
        }

        if(response?.status === 500) {
            setMessage('Coś poszło nie tak. Spróbój ponownie poźniej');
        }

        setTimeout(() => setMessage(''), 3000);
    }


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="register"
        >
            <label className="register__field">Username
                <input {...register("username")}
                    className="register__field-input" 
                    required
                />
            </label>
            <label className="register__field">Email
                <input {...register("email")} 
                className="register__field-input" 
                required
                />
            </label>
            <label className="register__field">Password
                <input 
                {...register('password')} 
                className="register__field-input" 
                required
                />
            </label>
            <input type="submit" className="register__submit" />
            {message && <div>{message}</div>}
        </form>
    )
}