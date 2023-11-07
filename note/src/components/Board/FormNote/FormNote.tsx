import { useState } from 'react';
import { createNote } from '../../../API/api';
import { useNoteContext } from '../../../context/Context';
import { toast, ToastContainer } from 'react-toastify';

import './FormNote.scss';

export function FormNote() {
    const [openCreator, setOpenCreator] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const { loadingData } = useNoteContext();

    const handleSubmitNote = async (e: React.FormEvent) => {
        e.preventDefault();
        const note = { title, content };
        try {
            const response = await createNote(note);
            if (response?.status === 201) {
                setTitle('');
                setContent('');
                toast.success('Notatka została pomyślnie utworzona')
                setOpenCreator(false);
                setTimeout(() => loadingData(), 500);
            }
        } catch (e) {
            toast.error('Coś poszło nie tak...');
        } finally {
            loadingData();
        }
    }


    return (
        <form
            className="formNote"
            onSubmit={handleSubmitNote}
            method='POST'
            action=''
        >
            <div className='formNote__wrapper'>

                <input type="text"
                    name="title"
                    className={`formNote__input-title ${openCreator ? '' : 'hide'}`}
                    placeholder='Tytuł'
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    autoComplete='false'
                    maxLength={15}
                />
                {openCreator
                    ? <textarea
                        name="content"
                        className={`formNote__input ${openCreator ? 'content' : ''}`}
                        placeholder='Treść'
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                        autoComplete='false'></textarea>
                    : <input
                        type="text"
                        name="content"
                        className={`formNote__input ${openCreator ? 'content' : ''}`}
                        placeholder='Utwórz notatkę...'
                        onClick={() => setOpenCreator(true)}
                        autoComplete='false'
                    />}

                {openCreator && <div className='formNote__close'>
                    <button
                        onSubmit={handleSubmitNote}
                    >
                        Utwórz</button>
                    <div
                        onClick={() => setOpenCreator(false)}
                    >
                        Zamknij
                    </div>
                </div>}
            </div>
            <ToastContainer />
        </form>
    )
}