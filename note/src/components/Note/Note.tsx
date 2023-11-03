import { useCallback, useState } from 'react';

import { NoteType } from '../../utils/Types';
import { NoteMenu } from '../NoteMenu/NoteMenu';
import { useNoteContext } from '../../context/Context';
import { editPartNote, editQuickNote } from '../../API/api';
import { ModalColors } from '../Popups/ModalColors/ModalColors';

import './Note.scss';
import { ModalNotification } from '../Popups/ModalNotification/ModalNotification';


interface NoteProps {
    note: NoteType,
    setSelectedNote: (note: NoteType) => void
}

export function Note({note, setSelectedNote}: NoteProps) {
    const [isHover, setIsHover] = useState(false);
    const [openOption, setOpenOption] = useState(false);
    const [isCalendar, setIsCalendar] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [message, setMessage] = useState('');

    const { title, content, id } = note;
    const { editNote, editionNote, loadingData } = useNoteContext();

    const editedNote = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        const newNote = {
            title: newTitle ? newTitle : title, 
            content: newContent ? newContent : content,
        }
        try {
            const response = await editQuickNote(newNote, id);
            if(response.status === 200) {
                setMessage('Udało się edytować');
            }
            
        }catch(e) {
            setMessage('Nie udało się edytować notatkę')
        } finally {
            setTimeout(() => setMessage(''), 3000);
            editionNote(null);
            loadingData();
        }
    }, [content, editionNote, id, loadingData, newContent, newTitle, title]);

 
    const handleOpenOption = useCallback(() => {
        setOpenOption(!openOption);
    }, [openOption]);


    const handleGetNotification = useCallback(async () => {
        setIsCalendar(!isCalendar)
    }, [isCalendar]);

    const handleAddToArchive = useCallback(async () => {

        const newNote = { ...note }
        newNote.completed = !newNote.completed;
        const response = await editPartNote(newNote, id);

        if (response?.status === 200) {
            loadingData();
        }
    }, [id, loadingData, note]);

    const [modalColors, setModalColors] = useState(false)

    const handleCloseModalColors = () => {
        setModalColors(false);
    }

    return (
        <div 
            className="note" 
            onMouseEnter={()=> setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            style={{backgroundColor: note.color}}
        >
            {editNote?.id === id
                ? <form 
                    action=""
                    onSubmit={editedNote}
                    >
                    <input
                    type='text'
                    className='note__title-edition'
                    placeholder='New Title'
                    onChange={(e) => { setNewTitle(e.target.value) }}
                    value={newTitle}
                />
                <input
                        type='text'
                        className='note__title-edition'
                        placeholder='New Content'
                        onChange={(e) => { setNewContent(e.target.value) }}
                        value={newContent}
                    />
                    <input onSubmit={editedNote} type='submit'/>
                </form>
                : <div onClick={() => setSelectedNote(note)}>
                <h2 className='note__title'>{title}</h2>
                <div className='note__content'>
                        {content}
                    </div>
                </div>}
                {message}
            <div className={`note__options ${isHover ? 'hover' : ''}`}>
                <img
                    src="/notifications.svg"
                    alt="notifications"
                    className='note__options-notifications note__options-item'
                    onClick={handleGetNotification}
                />
                <img
                    src='/archive.svg'
                    alt='archive'
                    className='note__options-archive note__options-item'
                    onClick={handleAddToArchive}
                />
                <img src="/palette.svg" alt="palette"
                    className='note__options-palette note__options-item'
                    onClick={() => setModalColors(true)} />
                <img src="/dots.svg" alt="dots"
                    className='note__options-dots note__options-item'
                    onClick={handleOpenOption}
                />
            </div>
            {openOption && <NoteMenu 
            note={note} />}
            {modalColors &&
                <ModalColors
                    note={note}
                    handleCloseModalColors={handleCloseModalColors}
                />}
                {isCalendar && 
                <ModalNotification 
                    handleGetNotification={handleGetNotification}
                />}
        </div>
    )
}