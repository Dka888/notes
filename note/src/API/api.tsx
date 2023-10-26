import axios, { AxiosError, AxiosResponse } from 'axios';
import { NoteType, User } from '../utils/Types';

const url = 'http://localhost:5000';

const urlUsers = `${url}/users`;

const urlNotes = `${url}/notes`;

export const registerUser = async(data: User): Promise<AxiosResponse | undefined> => {
    try {
       const response = await axios.post(`${urlUsers}/register`, data);
       return response;
    }catch(error) {
       if(error && (error as AxiosError).response){
        const response: AxiosResponse  = (error as AxiosError).response;
        return response;
       } 
       return undefined;
    }
}

export type LoginUser = Omit<User, 'email'> | Omit<User, 'username'>;

export const loginUser = async(data: LoginUser) => {
    try {
        const response = await axios.post(`${urlUsers}/login`, data);
        console.log(response)
        return response;
    }catch(error) {
        if(error && (error as AxiosError).response){
            const response: AxiosResponse  = (error as AxiosError).response;
            return response;
           } else
           return undefined;
    }
}

const token = localStorage.getItem('UserValidation')

export const getNotes = async() => {
    try {
        const response = await axios.get(urlNotes, {
            headers: {
                Authorization: token,
            }
        });
        console.log(response.data);
        return response.data
    } catch(error) {
        console.log(error);
    }
}

export const createNote = async(note: Pick<NoteType, 'title' | 'content'>) => {
    try {
        const response = await axios.post(urlNotes, note, {
            headers: {
                Authorization: token,
            }
        });
        console.log(response);
        return response.data;
    } catch(e){
        console.error(e);
    }
}

export const deleteNote = async(id: number) => {
    try{
        const response = await axios.delete(`${urlNotes}/${id}`);
        return response.data;
    }catch(e){
        console.error(e);
    }
}