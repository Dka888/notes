import { useForm, SubmitHandler } from "react-hook-form";
import { loginUser } from "../../../API/api";
import { checkValidEmail } from "../../../utils/utils";
import { toast, ToastContainer } from 'react-toastify';
import './Login.scss';
import { Link } from "react-router-dom";
import { useState } from "react";
import { Loading } from "../../Loading/Loading";
import { WrapperLoginRejestr } from "../WrapperLoginRejestr";
import { useNoteContext } from "../../../context/Context";


interface IFormInput {
    usernameOrMail: string,
    password: string
}

// interface LoginProps {
//     setShowLogin:(showLogin: boolean) => void,
// }

export function Login() {
    const { register, handleSubmit } = useForm<IFormInput>();
    const [isLoading, setIsLoading] = useState(false);

    const {setCookie} = useNoteContext();


    const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
        const { usernameOrMail, password } = data;
        setIsLoading(true);
        try {
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
            const { token } = response.data;
            setCookie('userToken', token);

            toast.success('Logowanie powiodło się');
            window.history.pushState({path: '/'}, '/');
        }

        if(response?.status === 401 || response?.status === 404) {
            toast.error('Błędne dane logowania')
        }

        if(response?.status === 500) {
            toast.error('Coś poszło nie tak. Spróbój później')
        }
        } catch (e) {
            toast.error('Coś poszło nie tak. Spróbój później')
        } finally {
            setTimeout(() => setIsLoading(false), 2000);
        }
    }

    return (
        <WrapperLoginRejestr>
             <div className="loginModule">
            <div></div>
            <h2 className="loginModule__title">Logowanie</h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="login"
            >
               <div className="login__fields">
                <label className="login__field">Username or email
                    <input {...register('usernameOrMail')}
                            className="login__field-input"
                            placeholder="demo login: test1"
                        />
                </label>

                <label className="login__field">Password
                        <input {...register('password')}
                            className="login__field-input"
                            type="password"
                            placeholder="demo password: test1"
                        />
                </label>
                
                </div> 
                    {isLoading ?
                        <div style={{margin: '0 auto'}}><Loading color={'green'} /></div>
                        : <input 
                            type="submit" 
                            className="login__submit" 
                            value='Zaloguj się'
                            onSubmit={handleSubmit(onSubmit)}
                        />}
              
            </form>
            <p className="loginModule__toRegister">Jeśli nie masz jeszcze konta
                <Link
                    to='/register'
                    className="loginModule__toRegister-click"
                > zarejestruj się
                </Link>
            </p>
        </div>  
        <ToastContainer />
        </WrapperLoginRejestr>
       
    )
}