import {Router} from 'express';
import { verifyToken } from '../middleware/middleware.js';
import { notesControllers } from '../controllers/note-controller.js';

export const noteRouter = Router();

noteRouter.get('/', verifyToken, notesControllers.getNotes);
noteRouter.post('/', verifyToken, notesControllers.createNote);
noteRouter.put('/:id', verifyToken, notesControllers.updateNote);
noteRouter.delete('/:id', verifyToken, notesControllers.deleteNote);