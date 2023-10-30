import { useCallback, useState } from 'react';
import './Note.scss';
import { NoteType } from '../../utils/Types';
import { NoteMenu } from '../NoteMenu/NoteMenu';
import { useNoteContext } from '../../context/Context';
import { editingNote } from '../../API/api';

interface NoteProps {
    note: NoteType,
}

export function Note({note}: NoteProps) {
    const [isHover, setIsHover] = useState(false);
    const [openOption, setOpenOption] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [message, setMessage] = useState('');

    const { title, content, id } = note;
    const { editNote, editionNote, loadingData } = useNoteContext();

    const editedNote = async (e: React.FormEvent) => {
        e.preventDefault();
        const newNote = {
            title: newTitle ? newTitle : title, 
            content: newContent ? newContent : content,
        }
        try {
            const response = await editingNote(newNote, id);
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
    }

 
    const handleOpenOption = useCallback(() => {
        setOpenOption(!openOption);
    }, [openOption]);

    const handleHoverOpen = useCallback(() => {
        setTimeout(() => setOpenOption(true), 500);
    }, []);

    const handleCloseOption = useCallback(() => {
        setTimeout(() => setOpenOption(false), 4000)
    }, []);

    return (
        <div 
            className="note" 
            onMouseEnter={()=> setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
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
                : <>
                <h2 className='note__title'>{title}</h2>
                <div className='note__content'>
                    <p>{content}</p>
                </div></>}
                {message}
            <div className={`note__options ${isHover ? 'hover' : ''}`}>
                <img src="/notifications.svg" alt="notifications" className='note__options-notifications note__options-item' />
                <img src='/archive.svg' alt='archive' className='note__options-archive note__options-item' />
                <img src="/palette.svg" alt="palette" className='note__options-palette note__options-item' />
                <img src="/dots.svg" alt="dots"
                    className='note__options-dots note__options-item'
                    onClick={handleOpenOption}
                    onMouseEnter={handleHoverOpen}
                    onMouseLeave={handleCloseOption}
                />
            </div>
            {openOption && <NoteMenu note={note} />}
        </div>
    )
}