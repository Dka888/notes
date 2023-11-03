import { Note } from '../models/note.js';

export async function getAllNotes(userId) {
    const notes = await Note.findAll({
        where: {userId },
    });
    return notes;
}

export async function createNewNote({title, content}, userId) {
    const note = await Note.create({
        title, content, userId
    });

    return note;
}

export async function updateOneNote(id, {title, content, completed, notification, forDelete, color}, userId) {
    const note = await findNote(id, userId);
    
    if(note) {
        note.title = title;
        note.content = content;
        note.completed = completed;
        note.notification = notification;
        note.forDelete = forDelete;
        note.color = color;
        await note.save();
    }

    return note;
}

export async function findNote(id, userId) {
    const note = await Note.findOne({
        where: { id, userId }
    });

    return note;
}

export async function deleteOneNote(note) {
    note.destroy();
}