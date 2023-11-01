import { FormNote } from '../FormNote/FormNote';
import { Note } from '../Note/Note';
import './Board.scss';
import { useNoteContext } from '../../context/Context';
import { ModalNote } from '../Popups/ModalNote/ModalNote';
import { useState } from 'react';
import { NoteType } from '../../utils/Types';

export function Board() {
    const {shownNotes} = useNoteContext();

    const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);
    
    const handlecloseNotePopup = () => {
        setSelectedNote(null);
    }
    return (
        <div className='board'>
            <FormNote />
            <ModalNote
                selectedNote={selectedNote}
                closeNotePopup={handlecloseNotePopup}
            />
            <div className='board__notes'>
                {shownNotes.map(note =>
                    <Note
                        note={note}
                        key={note.id}
                        setSelectedNote={setSelectedNote}
                    />)}
            </div>
        </div>
    );
}
