import { useForm, SubmitHandler } from "react-hook-form";
import { loginUser } from "../../../API/api";
import { checkValidEmail } from "../../../utils/utils";
import { toast, ToastContainer } from 'react-toastify';
import './Login.scss';
import { Link } from "react-router-dom";



interface IFormInput {
    usernameOrMail: string,
    password: string
}


export function Login() {
    const { register, handleSubmit } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
        const { usernameOrMail, password } = data;
        const isValidEmail = checkValidEmail(usernameOrMail);
        let response;

        if (isValidEmail) {
            const dataLogin = {
                email: usernameOrMail.trim(),
                password
            }
            response = await loginUser(dataLogin);

        } else {
            const dataLogin = {
                username: usernameOrMail.trim(),
                password
            }
            response = await loginUser(dataLogin);
        }
        if (response?.status === 200) {
            toast.success('Logowanie powiodło się');
            const { token } = response.data;
            localStorage.setItem('UserValidation', token);
            setTimeout(() => window.location.href = '/', 2000);
        }

        if(response?.status === 401 || response?.status === 404) {
            toast.error('Błędne dane logowania')
        }

        if(response?.status === 500) {
            toast.error('Coś poszło nie tak. Spróbój później')
        }
    }

    return (
        <div className="loginModule">
            <h2 className="loginModule__title">Logowanie</h2>
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="login"
        >
            <label className="login__field">Username or email
                <input {...register('usernameOrMail')}
                    className="login__field-input" />
            </label>

            <label className="login__field">Password
                <input {...register('password')} className="login__field-input" type="password"/>
            </label>
            <input 
            type="submit" 
            className="login__submit" 
            value='Zaloguj się'
            />
            <ToastContainer />
        </form>
            <p className="loginModule__toRegister">Jeśli nie masz jeszcze konta
                <Link
                    to='/register'
                    className="loginModule__toRegister-click"
                > zarejestruj się
                </Link>
            </p>
        </div>
    )
}