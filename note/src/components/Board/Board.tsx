import { FormNote } from './FormNote/FormNote';
import { Note } from './Note/Note';
import './Board.scss';
import { useNoteContext } from '../../context/Context';
import { ModalNote } from '../Popups/ModalNote/ModalNote';
import { useCallback, useState } from 'react';
import { NavbarOption, NoteOption, NoteType } from '../../utils/Types';
import { ModalColors } from '../Popups/ModalColors/ModalColors';
import { ModalNotification } from '../Popups/ModalNotification/ModalNotification';
import { editPartNote } from '../../API/api';
import { NoteMenu } from '../Popups/NoteMenu/NoteMenu';
import { ModalCreateNote } from '../Popups/ModalCreateNote/ModalCreateNote';
import { Nofications } from './Notifications/Nofications';

interface BoardProps {
    expanded: boolean;
    expandPermanent: boolean;
}


export function Board({expanded, expandPermanent}: BoardProps) {
    const { shownNotes, loadingData } = useNoteContext();
    const [option, setOption] = useState<NoteOption | null>(null);
    const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);
    const [hoverOption, setHoverOption] = useState(false);
    const [noteModalCreator, setNoteModalCreator] = useState(false);

    const {navbar} = useNoteContext();
      
    
    const handlecloseNotePopup = useCallback(() => {
        setSelectedNote(null);
    }, []);

    const closeNoteModalCreator = useCallback(() => {
        setNoteModalCreator(false);
    },[]);

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

    if(navbar === NavbarOption.notification){
        return (
            <div style={{ margin: '10px auto' }}>
                <Nofications />
            </div>)
    }


    return (
        <div className={`board ${(expanded || expandPermanent) ? 'expandedNavbar' : ''} `}>
            <FormNote />
            <ModalCreateNote
                closeNoteModalCreator={closeNoteModalCreator}
                noteModalCreator={noteModalCreator}
            />
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
                {navbar === NavbarOption.clearNotes && <div
                    className='board__emptyNote'
                    onClick={() => setNoteModalCreator(true)}
                >
                    <img src="/add.svg" alt="add" />
                </div>}
            </div>
        </div>
    );
}

