import { useState } from 'react';
import './Note.scss';

export function Note() {
    const [hoverNote, setHoverNote] = useState(false);

    return (
        <div 
            className="note" 
            onMouseEnter={()=> setHoverNote(true)}
            onMouseLeave={() => setHoverNote(false)}
        >
            <h2 className='note__title'>123</h2>
            <div className='note__content'>
                <p>123</p>
            </div>
            <div className={`note__options ${hoverNote ? 'hover' : ''}`}>
                <img src="/notifications.svg" alt="notifications" className='note__options-notifications'/>
                <img src='/archive.svg' alt='archive' className='note__options-archive'/>
                <img src="/palette.svg" alt="palette" className='note__options-palette'/>
                <img src="/dots.svg" alt="dots" className='note__options-dots'/>
            </div>
        </div>
    )
}