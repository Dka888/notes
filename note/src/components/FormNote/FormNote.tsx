import { useState } from 'react';
import './FormNote.scss';
import { createNote } from '../../API/api';
import { useNoteContext } from '../../context/Context';



export function FormNote() {
    const [openCreator, setOpenCreator] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const {loadingData} = useNoteContext();

    const handleSubmitNote = async (e: React.FormEvent) => {
        e.preventDefault();
        const note = { title, content };
        try {
            const response = await createNote(note);
            console.log(response);
            setTitle('');
            setContent('');
            loadingData()

        } catch (e) {
            console.log(e)
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
                    placeholder='title'
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    autoComplete='false'
                />
            <input
                type="text"
                name="content"
                className={`formNote__input ${openCreator ? 'content' : ''}`}
                placeholder='Utwórz notatkę...'
                onClick={() => setOpenCreator(true)}
                onChange={(e) => setContent(e.target.value)}
                value={content}
                autoComplete='false'
            />

                {openCreator && <div className='formNote__close'>
                    <button onSubmit={handleSubmitNote}>Wyślij</button>
                    <div
                        onClick={() => setOpenCreator(false)}
            >
                Zamknij
                    </div>
            </div>}
            </div>
        </form>
    )
}