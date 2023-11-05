import { useForm, SubmitHandler } from "react-hook-form";
import './Rejestration.scss';
import { User } from "../../../utils/Types";
import { registerUser } from "../../../API/api";
import { checkValidEmail } from "../../../utils/utils";
import { toast, ToastContainer } from 'react-toastify';

interface IFormInput {
    username: string,
    email: string,
    password: string
}


export function Rejestration() {
    const { register, handleSubmit } = useForm<IFormInput>()

    const onSubmit: SubmitHandler<IFormInput> = async(data: User) => {
        
        const { username, email, password } = data;
        const isValidEmail = checkValidEmail(email);

        if(!isValidEmail) {
            toast.error('Wpisz poprawny email');
            return;
        }

        const response = await registerUser({ username, email, password });
        if(response?.status === 200) {
            toast.success('Rejestracja udana');
            localStorage.setItem('UserValidation', response.data.token);
            window.location.href = '/';
        }
        if(response?.status === 404) {
            toast.error('Zmień nazwę użytkownika lub email');
        }

        if(response?.status === 500) {
            toast.error('Coś poszło nie tak. Spróbój ponownie poźniej');
        }
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
                type="password"
                />
            </label>
            <input type="submit" className="register__submit" value='Zarejestruj się'/>
            <ToastContainer />
        </form>
    )
}