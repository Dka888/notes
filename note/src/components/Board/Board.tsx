import { FormNote } from '../FormNote/FormNote';
import { Note } from '../Note/Note';
import './Board.scss';

export function Board() {
    return (
        <div className='board'>
            <FormNote />
            <div className='board__notes'>
                <Note />
            </div>
        </div>
    );
}
