import { useCallback, useEffect, useState } from 'react';
import { NoteOptions } from './NoteOptions/NoteOptions';
import { NoteOption, NoteType } from '../../../utils/Types';
import { useNoteContext } from '../../../context/Context';
import { editPartNote, editQuickNote } from '../../../API/api';

import './Note.scss';


interface NoteProps {
    note: NoteType,
    setSelectedNote: (note: NoteType | null) => void,
    setOption: (option: NoteOption | null) => void,
    option: NoteOption | null,
    hoverOption: boolean;
}

export function Note({ note, setSelectedNote, setOption, hoverOption, option }: NoteProps) {
    const [isHover, setIsHover] = useState(false);
    const [newTitle, setNewTitle] = useState(note.title);
    const [newContent, setNewContent] = useState(note.content);
    const [message, setMessage] = useState('');

    const { title, content, id } = note;
    const { editNote, editionNote, loadingData } = useNoteContext();

    const closeOptions = useEffect(() => {
        if (isHover && option === NoteOption.others) {
            setTimeout(() => {
                setSelectedNote(null);
                setOption(null);
            }, 3000);
        }
    }, [hoverOption, isHover, option, setOption, setSelectedNote]);

    const editedNote = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        const newNote = {
            title: newTitle ? newTitle : title,
            content: newContent ? newContent : content,
        }
        try {
            const response = await editQuickNote(newNote, id);
            if (response.status === 200) {
                setMessage('Udało się edytować');
            }

        } catch (e) {
            setMessage('Nie udało się edytować notatkę')
        } finally {
            setTimeout(() => setMessage(''), 3000);
            editionNote(null);
            loadingData();
        }
    }, [content, editionNote, id, loadingData, newContent, newTitle, title]);

    const handleAddToArchive = useCallback(async () => {

        const newNote = { ...note }
        newNote.completed = !newNote.completed;
        const response = await editPartNote(newNote, id);

        if (response?.status === 200) {
            loadingData();
        }
    }, [id, loadingData, note]);

    const handleOpenCalendar = useCallback(() => {
        setOption(NoteOption.calendar);
        setSelectedNote(note);
    }, [note, setOption, setSelectedNote]);

    const handleOpenColor = useCallback(() => {
        setOption(NoteOption.palette);
        setSelectedNote(note);
    }, [note, setOption, setSelectedNote]);

    const handleOpenOthers = useCallback(() => {
        setOption(NoteOption.others);
        setSelectedNote(note);
    }, [note, setOption, setSelectedNote]);

    const functions = { handleOpenCalendar, handleOpenColor, handleOpenOthers }

    return (
        <div
            className="note"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            style={{ backgroundColor: note.color }}
            onMouseOut={() => closeOptions}
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
                        onChange={(e) => setNewTitle(e.target.value)}
                        value={newTitle}
                    />
                    <input
                        type='text'
                        className='note__title-edition'
                        placeholder='New Content'
                        onChange={(e) => setNewContent(e.target.value)}
                        value={newContent}
                    />
                    <div className='note__buttons'>
                        <input onSubmit={editedNote} type='submit' />
                        <button onClick={() => editionNote(null)}>Zamknij</button>
                    </div>
                </form>
                : <div 
                    onClick={() => setSelectedNote(note)}
                    className='note__wrap'
                    >
                    <h2 className='note__title'>{title}</h2>
                    <div className='note__content'>
                        {content}
                    </div>
                </div>}
            {message}
            <NoteOptions
                isHover={isHover}
                handleAddToArchive={handleAddToArchive}
                functions={functions}
            />
        </div>
    )
}