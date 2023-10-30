export interface User {
    username: string,
    email: string,
    password: string,
} 

export interface NoteType {
    title: string,
    content: string,
    id: number,
    updatedAt: string,
    completed: boolean,
    notification: string | null,
    forDelete: boolean,
}