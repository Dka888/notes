import { useCallback, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Popup from "reactjs-popup";
import { createNote } from "../../../API/api";
import { useNoteContext } from "../../../context/Context";

interface ModalCreateNoteProps {
    closeNoteModalCreator: () => void;
    noteModalCreator: boolean;
}

export const ModalCreateNote = ({closeNoteModalCreator, noteModalCreator}: ModalCreateNoteProps) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const {loadingData} = useNoteContext();

    const createNewNote = useCallback(async() => {
        const newNote = {title, content};

        try {
            const response = await createNote(newNote);
            if(response?.status === 201) {
                toast.success('Notatka pomyślnie utworzona'); 
                setTimeout(() => closeNoteModalCreator(), 500); 
                setTitle('');
                setContent('');
                loadingData();
            }
        } catch(e) {
            toast.error('Nie udało się utworzyć notatki')
        }
    }, [closeNoteModalCreator, content, loadingData, title]);
    
    return (
        <Popup open={noteModalCreator}>
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
                <div className='notePopup__buttons'>
                    <button onClick={createNewNote}>Zapisz</button>
                    <button onClick={closeNoteModalCreator}>Zamknij</button>
                </div>
            </div>
            <ToastContainer />
        </Popup>
    )
}