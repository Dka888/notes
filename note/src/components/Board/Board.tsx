import { FormNote } from '../FormNote/FormNote';
import { Note } from '../Note/Note';
import './Board.scss';
import { useNoteContext } from '../../context/Context';

export function Board() {
    const {notes} = useNoteContext();

    return (
        <div className='board'>
            <FormNote />
            <div className='board__notes'>
                {notes.map(note => <Note note={note} key={note.id} />)}
            </div>
        </div>
    );
}
