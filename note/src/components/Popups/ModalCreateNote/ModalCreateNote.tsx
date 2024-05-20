import { useCallback, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Popup from "reactjs-popup";
import { createNote } from "../../../API/api";
import { useNoteContext } from "../../../context/Context";
import { Loading } from "../../Loading/Loading";
import '../ModalNote/ModalNote.scss';
import { NoteType } from "../../../utils/Types";

interface ModalCreateNoteProps {
    closeNoteModalCreator: () => void;
    noteModalCreator: boolean;
    dateInfo?: Date
}

export const ModalCreateNote = ({closeNoteModalCreator, noteModalCreator, dateInfo}: ModalCreateNoteProps) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { loadingData, isLoading } = useNoteContext();
    const token = localStorage.getItem('UserValidation');
    const createNewNote = useCallback(async() => {
        const newNote: Pick<NoteType, 'title' | 'content' | 'notification'> = {title, content, notification: dateInfo ? dateInfo : null};
        try {
            const response = await createNote(newNote);
            if(response?.status === 200) { 
                loadingData();
                toast.success('Notatka pomyślnie utworzona'); 
                setTitle('');
                setContent('');
               
                setTimeout(() => closeNoteModalCreator(), 1000); 
            }
        } catch(e) {
            toast.error('Nie udało się utworzyć notatki')
        }
    }, [closeNoteModalCreator, content, loadingData, title, dateInfo]);
    
    if(!token) {
        window.location.href = '/login';
    }
    
    return (
        <Popup 
            open={noteModalCreator}
            onClose={closeNoteModalCreator}
        >
              <div className="notePopup">
                <div className='notePopup__item'>
                    <h2>Tytuł</h2>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={25}
                        placeholder="Tytuł"
                    />
                </div>
                <div className='notePopup__item'>
                    <h2>Treść</h2>
                    <textarea 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Treść"
                    />
                </div>
                {isLoading
                    ? <div style={{ margin: '0 auto' }}><Loading color={'green'} /></div>
                    : <div className='notePopup__buttons'>
                    <button onClick={createNewNote}>Zapisz</button>
                    <button onClick={closeNoteModalCreator}>Zamknij</button>
                    </div>}
            </div>
            <ToastContainer />
        </Popup>
    )
}