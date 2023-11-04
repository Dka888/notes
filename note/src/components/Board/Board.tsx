import { FormNote } from './FormNote/FormNote';
import { Note } from './Note/Note';
import './Board.scss';
import { useNoteContext } from '../../context/Context';
import { ModalNote } from '../Popups/ModalNote/ModalNote';
import { useCallback, useState } from 'react';
import { NoteOption, NoteType } from '../../utils/Types';
import { ModalColors } from '../Popups/ModalColors/ModalColors';
import { ModalNotification } from '../Popups/ModalNotification/ModalNotification';
import { editPartNote } from '../../API/api';
import { NoteMenu } from '../Popups/NoteMenu/NoteMenu';

export function Board() {
    const { shownNotes, loadingData } = useNoteContext();
    const [option, setOption] = useState<NoteOption | null>(null);
    const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);
    const [hoverOption, setHoverOption] = useState(false);
    
    const handlecloseNotePopup = useCallback(() => {
        setSelectedNote(null);
    }, []);

    const handleAddNotification = useCallback(async (data: Date) => {
        if (selectedNote) {
            const newNote = { ...selectedNote };
            newNote.notification = data;
            const response = await editPartNote(newNote, selectedNote.id);
            if (response?.status === 200) {
                setTimeout(() => loadingData(), 5000);
            }
        }
    }, [loadingData, selectedNote]);

    console.log(shownNotes);

    return (
        <div className='board'>
            <FormNote />
            <ModalNote
                selectedNote={selectedNote}
                closeNotePopup={handlecloseNotePopup}
                option={option}
            />
            <div className='board__notes'>
                {shownNotes.map(note =>
                    <div style={{ position: 'relative' }} key={note.id}>
                    <Note
                            note={note}
                            setSelectedNote={setSelectedNote}
                            setOption={setOption}
                            option={option}
                            hoverOption={hoverOption}
                        />
                        {option === NoteOption.palette && selectedNote?.id === note.id &&
                            <ModalColors
                                note={note}
                                setOption={setOption}
                                setSelectedNote={setSelectedNote}
                            />}
                        {option === NoteOption.calendar && selectedNote?.id === note.id &&
                            <ModalNotification
                                setOption={setOption}
                                handleAddNotification={handleAddNotification}
                                setSelectedNote={setSelectedNote}
                            />}
                        {option === NoteOption.others && selectedNote?.id === note.id &&
                            <NoteMenu
                                note={note}
                                setHoverOption={setHoverOption}
                            />
                        }
                    </div>)}
            </div>
        </div>
    );
}

