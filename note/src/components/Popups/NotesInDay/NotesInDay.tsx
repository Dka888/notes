import Popup from "reactjs-popup";
import { NoteType } from "../../../utils/Types";
import 'reactjs-popup/dist/index.css';
import './NotesInDay.scss';


interface NotesInDayProps {
    notesInDay: NoteType[] | null;
    setNotesInDay: (notesInDay: NoteType[] | null) => void;
    handleClearNotification:(note: NoteType) => void;
}

export const NotesInDay = ({ notesInDay, setNotesInDay, handleClearNotification }: NotesInDayProps) => {

    const open = notesInDay === null ? false : true;
    if (notesInDay?.length) {
        return (
            <Popup open={open}>
                <div className="popup_notesInDay">

                    {notesInDay.map(note =>
                        <div
                            className="note"
                            style={{ backgroundColor: note.color }}
                        >
                         
                            <div
                                className="popup_notesInDay__closeNote"
                                onClick={() => handleClearNotification(note)}
                            >
                                <img src="/close.svg" alt="close" />
                            </div>
                            <div className="note__title">{note.title}</div>
                            <div className="note__content">{note.content}</div>
                        
                        </div>
                    )}
                </div>
                <div
                    className="popup_notesInDay__close"
                    onClick={() => setNotesInDay(null)}
                > Zamknij
                    <img src="/close.svg" alt="close" />
                </div>
            </Popup>
        )
    }
    return null;
}