/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { NoteType, User } from '../utils/Types';


const url = 'https://db-express-postgres-vercel.vercel.app';

const urlUsers = `${url}/users`;

const urlNotes = `${url}/notes`;


interface AxiosError<T = any> extends Error {
    config: AxiosRequestConfig;
    code?: string;
    request?: any;
    response?: AxiosResponse<T>;
    isAxiosError: boolean;
    toJSON: () => object;
}

export const registerUser = async(data: User) => {
    console.log(data);
    return await axios.post(`${urlUsers}/register`, data)
       .then((response:AxiosResponse) => {
        return response;
       })
    .catch((error: AxiosError) => {
       if(error.response){
         return  error.response;
       } 
       return undefined;
    });
}

export type LoginUser = Omit<User, 'email'> | Omit<User, 'username'>;



export const loginUser = async (data: LoginUser) => {
    return await axios.post(`${urlUsers}/login`, data)
        .then((response: AxiosResponse) => {
            return response;
        })
        .catch((error: AxiosError) => {
            if (error.response) {
                return error.response;
            } else {
                throw error;
            }
        });
}


export const getNotes = async(token:string) => {
  return await axios.get(urlNotes, {
            headers: {
                Authorization: token,
            }
        })
        .then((response:AxiosResponse) => response.data
        )
        
        .catch((error: AxiosError) => {
        if (error.response) {
            const { response } = error;

            if (response.status === 403) {
                localStorage.clear();
            } else if(response.status === 500) {
                localStorage.clear();
            } else {
                return undefined;
            }

        }
    });
}

export const createNote = async(note: Pick<NoteType, 'title' | 'content'>, token: string) => {
    try {
        const response = await axios.post(urlNotes, note, {
            headers: {
                Authorization: token,
            }
        });
        return response;
    } catch(e){
        console.error(e);
    }
}

export const deleteNote = async(id: number, token:string) => {
    try{
        const response = await axios.delete(`${urlNotes}/${id}`, {
            headers: {
                Authorization: token,
            }
        });      
        return response;
    } catch(e){
        console.error(e);
    }
}

export const editQuickNote = async(note: Pick<NoteType, 'title' | 'content'>, id: number, token: string) => {
    try {
        const response = await axios.put(`${urlNotes}/${id}`, note, {
            headers: {
                Authorization: token,
            }
        });
        return response;
    } catch(e){
        console.error(e);
    }
}


export const editPartNote = async(note: NoteType, id: number, token: string) => {
    console.log(note);
    try {
        const response = await axios.put(`${urlNotes}/${id}`, note, {
            headers: {
                Authorization: token,
            }
        });
        console.log(response);
        return response
    } catch(e) {
        console.log(e);
    }
}



// const loginUserInVercel = async(data) => {
    
// }