import { Note } from '../models/note.js';
import { getAllNotes, createNewNote, updateOneNote, deleteOneNote, findNote } from '../services/note-service.js';

const getNotes = async (req, res) => {
  const { userId } = req;
    try {
      const notes = await getAllNotes(userId);
      res.status(200).send(notes);
    } catch (error) {
      res.status(500).send('Błąd podczas pobierania notatek.');
    }
  }

const createNote = async (req, res) => {
    const { title, content } = req.body; 
    const { userId } = req;
    try {
      const note = await createNewNote({title, content}, userId);
      res.status(201).send(note);
    } catch (error) {
      res.status(500).send('Błąd podczas dodawania notatki.');
    }
  }

  const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content, completed, notification, forDelete, color } = req.body;

    try {
      const note = await Note.findOne({where: {id}})
  
      if (!note) {
        return res.status(404).send('Notatka nie znaleziona.');
      }

      if(title) note.title = title;
      if(content) note.content = content;
      if(completed) note.completed = completed;
      if(notification) note.notification = notification;
      if(forDelete) note.forDelete = forDelete;
      if(color) note.color = color;

      await note.save();

      res.status(200).send(note);
    } catch (error) {
      res.status(500).send('Błąd podczas edycji notatki.');
    }
  }

  const deleteNote =  async (req, res) => {
    const { id } = req.params;
  
    try {
      const note = await findNote(id, req.userId);
  
      if (!note) {
        return res.status(404).send('Notatka nie znaleziona.');
      }
      await deleteOneNote(note);
      res.status(204).send();
    } catch (error) {
      res.status(500).send('Błąd podczas usuwania notatki.');
    }
  }

  export const notesControllers = {
    getNotes,
    createNote,
    updateNote,
    deleteNote
  }