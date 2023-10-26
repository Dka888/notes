import { useCallback, useEffect, useState } from 'react';
import { FormNote } from '../FormNote/FormNote';
import { Note } from '../Note/Note';
import './Board.scss';
import { NoteType } from '../../utils/Types';
import { getNotes } from '../../API/api';

export function Board() {
    const [notes, setNotes] = useState<NoteType[]>([]);
    
    const loadingData = useCallback(async () => {
        const data = await getNotes();
        setNotes(data);
        return data;
    }, []);

    useEffect(() => {
        loadingData();
    }, [loadingData]);


    return (
        <div className='board'>
            <FormNote loadingData={loadingData}/>
            <div className='board__notes'>
                {notes.map(note => <Note note={note} key={note.id}/>)}
            </div>
        </div>
    );
}
