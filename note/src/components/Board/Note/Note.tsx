import { useCallback, useEffect, useState } from 'react';
import { NoteOptions } from './NoteOptions/NoteOptions';
import { NavbarOption, NoteOption, NoteType } from '../../../utils/Types';
import { useNoteContext } from '../../../context/Context';
import { editPartNote, editQuickNote } from '../../../API/api';
import { toast, ToastContainer } from 'react-toastify';

import './Note.scss';
import classNames from 'classnames';


interface NoteProps {
    note: NoteType,
    setSelectedNote: (note: NoteType | null) => void,
    setOption: (option: NoteOption | null) => void,
    option: NoteOption | null,
    hoverOption: boolean;
}

export function Note({ note, setSelectedNote, setOption, hoverOption, option }: NoteProps) {
    const [isHover, setIsHover] = useState(hoverOption);
    const [newTitle, setNewTitle] = useState(note.title);
    const [newContent, setNewContent] = useState(note.content);


    const { title, content, id } = note;
    const { editNote, editionNote, loadingData, navbar } = useNoteContext();

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
        const newNote = { ...note };
        newNote.title = newTitle;
        newNote.content = newContent;

        try {
            const response = await editQuickNote(newNote, id, isLogin);
            if (response?.status === 200) {
                toast.success('Udało się edytować')
            }
        } catch (e) {
            toast.error('Coś poszło nie tak')
        } finally {
            setTimeout(() => {
                editionNote(null);
                loadingData();
            }, 3000);
        }
    }, [editionNote, id, isLogin, loadingData, newContent, newTitle, note]);

    const handleAddToArchive = useCallback(async () => {

        const newNote = { ...note }
        newNote.completed = !newNote.completed;
        const response = await editPartNote(newNote, id, isLogin);

        if (response?.status === 200) {
            loadingData();
        }
    }, [id, isLogin, loadingData, note]);

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


    const handleMovetoBush = useCallback(async () => {
        const newNote = { ...note };
        newNote.forDelete = true;
        try {
            const response = await editPartNote(newNote, id);
            if (response?.status === 200) {
                toast.success('Notatka przeniesiona do kosza');
                loadingData();
            }
        } catch (error) {
            toast.error('Nie udało się przenieść notatkę do kosza')
        }
    },[id, loadingData, note]);

    const functions = { handleOpenCalendar, handleOpenColor, handleOpenOthers }

    const arrayList = content.split('\n');

    return (
        <div
            className="note"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            style={{ backgroundColor: note.color }}
            onMouseOut={() => closeOptions}
        >
            {navbar === NavbarOption.edition && <input type='checkbox'  className='checkbox' onClick={handleAddToArchive}/>}
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
                        <input onSubmit={editedNote} type='submit' value='Zapisz'/>
                        <button onClick={() => editionNote(null)}>Zamknij</button>
                    </div>
                </form>
                : <div 
                    onClick={() => setSelectedNote(note)}
                    className='note__wrap'
                    >
                     <h2 className={classNames('note__title', {'completed':note.completed})}>{title}</h2>
                    <ul className='note__content'>
                        {arrayList.map(item => 
                            <li 
                                key={item} 
                                className={classNames('note__content-item', {'completed':note.completed})}
                            >
                            {item}
                        </li>)}
                    </ul>
                </div>}
            <ToastContainer />
            <NoteOptions
                isHover={isHover}
                functions={functions}
                note={note}
                handleMoveToBush={handleMovetoBush}
            />
        </div>
    )
}