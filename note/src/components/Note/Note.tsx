import { useState } from 'react';
import './Note.scss';
import { NoteType } from '../../utils/Types';

interface NoteProps {
    note: NoteType
}

export function Note({note}: NoteProps) {
    const [isHover, setIsHover] = useState(false);
    const {title, content} = note;
    
    return (
        <div 
            className="note" 
            onMouseEnter={()=> setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <h2 className='note__title'>{title}</h2>
            <div className='note__content'>
                <p>{content}</p>
            </div>
            <div className={`note__options ${isHover ? 'hover' : ''}`}>
                <img src="/notifications.svg" alt="notifications" className='note__options-notifications'/>
                <img src='/archive.svg' alt='archive' className='note__options-archive'/>
                <img src="/palette.svg" alt="palette" className='note__options-palette'/>
                <img src="/dots.svg" alt="dots" className='note__options-dots'/>
            </div>
        </div>
    )
}