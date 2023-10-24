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
    const { title, content } = req.body;
    const { userId } = req;
  
    try {
      const note = await updateOneNote(id, {title, content}, userId)
  
      if (!note) {
        return res.status(404).send('Notatka nie znaleziona.');
      }

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
      deleteOneNote(note);
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