import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
import { NoteOption, NoteType } from '../../../utils/Types';
import './ModalNote.scss';
import { useEffect, useState } from 'react';
import { editPartNote } from '../../../API/api';
import { useNoteContext } from '../../../context/Context';

interface ModalNoteProps {
    selectedNote: NoteType | null,
    closeNotePopup: () => void,
    option: NoteOption | null,
}

export const ModalNote = ({ selectedNote, closeNotePopup, option }: ModalNoteProps) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (selectedNote) {
            setTitle(selectedNote.title);
            setContent(selectedNote.content);
        }
    }, [selectedNote]);

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
            open={selectedNote !== null && option === null}
            onClose={closeNotePopup}
        >
            <div className="notePopup">
                <div className='notePopup__item'>
                    <h2>Title</h2>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='notePopup__item'>
                    <h2>Content</h2>
                    <textarea 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)}
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
