import { useState } from 'react';
import { deleteNote } from '../../API/api';
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

    if(message) {
        return(<div className='message'>
            {message}
        </div>)
    }

    return (
        <div className="noteMenu">
            <div
                className='noteMenu__option'
                onClick={handleDeleteNote}
            >
                Usuń
            </div>
            <div
                className='noteMenu__option'
                onClick={()=> editionNote(note)}
            >
                Edytuj
            </div>
        </div>
    )
}