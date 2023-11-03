import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
import { NoteType } from '../../../utils/Types';
import './ModalNote.scss';
import { useState } from 'react';
import { editPartNote } from '../../../API/api';
import { useNoteContext } from '../../../context/Context';

interface ModalNoteProps {
    selectedNote: NoteType | null,
    closeNotePopup: () => void,
}

export const ModalNote = ({ selectedNote, closeNotePopup }: ModalNoteProps) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const {loadingData} = useNoteContext();

    const saveNoteChanges = async() => {
        if(selectedNote !== null) {

        const newNote = {...selectedNote};
            if (title || content) {
                newNote.title = title || selectedNote.title;
                newNote.content = content || selectedNote.content;
                try {
                    const response = await editPartNote(newNote, selectedNote?.id);
                    console.log(response);
                    setTitle('');
                    setContent('');
                    closeNotePopup();
                    loadingData();

            } catch (e) {
                console.log(e)
            }
        }
        }
    }

    return (
        <Popup
            open={selectedNote !== null}
            onClose={closeNotePopup}
        >
            <div className="notePopup">
                <div className='notePopup__item'>
                    <h2>Title</h2>
                    <input
                        value={title || ''}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={selectedNote?.title}
                    />
                </div>
                <div className='notePopup__item'>
                    <h2>Content</h2>
                    <textarea 
                        value={content || ''} 
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={selectedNote?.content}
                    />
                </div>
                <div className='notePopup__buttons'>
                    <button onClick={saveNoteChanges}>Zapisz</button>
                    <button onClick={closeNotePopup}>Zamknij</button>
                </div>
            </div>
        </Popup>
    );
};
