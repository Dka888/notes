import { useState } from 'react';
import './FormNote.scss';

export function FormNote() {
    const [openCreator, setOpenCreator] = useState(false);
    console.log(openCreator);

    return (
        <form
            className="formNote"

        >
            {openCreator &&
                <input type="text"
                    name="title"
                    className="formNote__input-title"
                    placeholder='title' />
            }
            <input
                type="text"
                name="content"
                className={`formNote__input ${openCreator ? 'content' : ''}`}
                placeholder='Utwórz notatkę...'
                onClick={() => setOpenCreator(true)}
            />

            {openCreator && <div
                onClick={() => setOpenCreator(false)}
                className='formNote__close'
            >
                Zamknij
            </div>}
        </form>
    )
}