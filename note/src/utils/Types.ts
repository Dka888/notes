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
    notification: Date | string | null,
    forDelete: boolean,
    color: string,
}

export enum NavbarOption{
    clearNotes = 'clearNotes',
    notification = 'notification',
    archive = 'archive',
    forDelete = 'forDelete',
    edition = 'edition'
}

export enum NoteOption {
    calendar = 'calendar',
    palette = 'palette',
    others = 'others',
}