import { useState } from 'react';
import { deleteNote, editPartNote } from '../../API/api';
import './NoteMenu.scss';
import { useNoteContext } from '../../context/Context';
import { NoteType } from '../../utils/Types';

interface NoteMenuProps {
    note: NoteType
}

export const NoteMenu = ({note}: NoteMenuProps) => {
    const [message, setMessege] = useState('');

    const {id} = note;

    const {loadingData, editionNote} = useNoteContext();
     
    const handleDeleteNote = async() => {
        try {
           const response = await deleteNote(id);
           if(response?.status === 204) {
            setMessege('Notatka została usunięta');
            loadingData();
           }
        } catch(error) {
           setMessege('Nie udało się usunąć notatkę')
        } finally {
            setTimeout(() => setMessege(''), 2000);
        }
    }

    const handleMovetoBush = async () => {
        const newNote = { ...note };
        newNote.forDelete = true;
        try {
            const response = await editPartNote(newNote, id);
            if (response?.status === 200) {
                setMessege('Notatka przeniesiona do kosza');
                loadingData();
            }
        } catch (error) {
            setMessege('Nie udało się przenieść notatkę do kosza')
        } finally {
            setTimeout(() => setMessege(''), 1500);
        }
    }

    const handleBackFromBush = async () => {
        const newNote = { ...note };
        newNote.forDelete = false;
        try {
            const response = await editPartNote(newNote, id);
            if (response?.status === 200) {
                setMessege('Notatka przewrócona');
                loadingData();
            }
        } catch (error) {
            setMessege('Nie udało się przewrócić notatki')
        } finally {
            setTimeout(() => setMessege(''), 1500);
        }
    }

    if(message) {
        return(<div className='message'>
            {message}
        </div>)
    }

    return (
        <div className="noteMenu">
            {note.forDelete
                ? <><div
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
                : <div
                    className='noteMenu__option'
                    onClick={handleMovetoBush}
            >
                Przenieś do kosza
                </div>}
            <div
                className='noteMenu__option'
                onClick={()=> editionNote(note)}
            >
                Szybka edycja
            </div>
        </div>
    )
}