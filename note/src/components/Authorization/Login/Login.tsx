import { useForm, SubmitHandler } from "react-hook-form";
import './Login.scss';
import { loginUser } from "../../../API/api";
import { useState } from "react";
import { checkValidEmail } from "../../../utils/utils";

interface IFormInput {
    usernameOrMail: string,
    password: string
}


export function Login() {
    const { register, handleSubmit } = useForm<IFormInput>();
    const [message, setMessage] = useState('');

    const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
        const { usernameOrMail, password } = data;
        const isValidEmail = checkValidEmail(usernameOrMail);
        let response;

        if (isValidEmail) {
            const dataLogin = {
                email: usernameOrMail,
                password
            }
            response = await loginUser(dataLogin);

        } else {
            const dataLogin = {
                username: usernameOrMail,
                password
            }
            response = await loginUser(dataLogin);
        }
        if (response?.status === 200) {
            setMessage('Logowanie udało się');
            localStorage.setItem('UserValidation', response.data);
        }

        if(response?.status === 401 || response?.status === 404) {
            setMessage('Błędne dane logowania')
        }

        if(response?.status === 500) {
            setMessage('Coś poszło nie tak. Spróbój później')
        }

        setTimeout(() => setMessage(''), 3000);
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="login"
        >
            <label className="login__field">Username or email
                <input {...register('usernameOrMail')}
                    className="login__field-input" />
            </label>

            <label className="login__field">Password
                <input {...register('password')} className="login__field-input" />
            </label>
            {!message 
                ? <input type="submit" className="login__submit" />
                : <div>{message}</div>}
        </form>
    )
}