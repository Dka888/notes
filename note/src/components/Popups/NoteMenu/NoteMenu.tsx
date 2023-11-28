import {toast, ToastContainer} from 'react-toastify';
import { deleteNote, editPartNote } from '../../../API/api';
import { useNoteContext } from '../../../context/Context';
import { NoteType } from '../../../utils/Types';

import './NoteMenu.scss';
import { useCallback } from 'react';


interface NoteMenuProps {
    note: NoteType;
    setHoverOption: (hoverOption: boolean) => void;
}

export const NoteMenu = ({ note, setHoverOption}: NoteMenuProps) => {

    const { id } = note;

    const { loadingData, editionNote, isLogin } = useNoteContext();

    const handleDeleteNote = useCallback(async () => {
        try {
            const response = await deleteNote(id, isLogin);
            if (response?.status === 204) {
                toast.success('Notatka została usunięta');
                loadingData();
            }
        } catch (error) {
            toast.error('Nie udało się usunąć notatkę')
        }
    },[id, loadingData]);

    const handleMovetoBush = useCallback(async () => {
        const newNote = { ...note };
        newNote.forDelete = true;
        try {
            const response = await editPartNote(newNote, id, isLogin);
            if (response?.status === 200) {
                toast.success('Notatka przeniesiona do kosza');
                loadingData();
            }
        } catch (error) {
            toast.error('Nie udało się przenieść notatkę do kosza')
        }
    },[id, loadingData, note]);

    const handleBackFromBush = useCallback(async () => {
        const newNote = { ...note };
        newNote.forDelete = false;
        try {
            const response = await editPartNote(newNote, id, isLogin);
            if (response?.status === 200) {
                toast.success('Notatka przewrócona');
                loadingData();
            }
        } catch (error) {
            toast.error('Nie udało się przewrócić notatki')
        }
    },[id, loadingData, note])


    return (
        <div 
            className="noteMenu"
            onMouseEnter={() => setHoverOption(true)}
            onMouseOut={() => setHoverOption(false)}
        >
            {note.forDelete
                ? <>
                    <div
                        className='noteMenu__option'
                        onClick={handleDeleteNote}
                    > Usuń
                    </div>
                    <div
                        className='noteMenu__option'
                        onClick={handleBackFromBush}
                    >
                        Przywróć
                    </div>
                </>
                : <>
                    <div
                        className='noteMenu__option'
                        onClick={() => editionNote(note)}
                    >
                        Szybka edycja
                    </div>
                    <div
                        className='noteMenu__option'
                        onClick={handleMovetoBush}
                    >
                        Przenieś do kosza
                    </div>
                </>}
                <ToastContainer />
        </div>
    )
}