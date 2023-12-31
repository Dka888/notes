import { useCallback } from 'react';
import './ModalColors.scss';
import { NoteOption, NoteType } from '../../../utils/Types';
import { editPartNote } from '../../../API/api';
import { useNoteContext } from '../../../context/Context';
import {toast, ToastContainer} from 'react-toastify';
import { colors } from '../../../utils/utils';


interface ModalColorsProps {
    setOption: (option: NoteOption | null) => void,
    note: NoteType,
    setSelectedNote: (selectedNote: NoteType | null) => void,
}

export const ModalColors = ({ setOption, note, setSelectedNote }: ModalColorsProps) => {
    const {loadingData, isLogin} = useNoteContext();

    const handleChangeColor = useCallback(async(color: string) => {
        const newNote = {...note};
        newNote.color = color;
        try {
            const response = await editPartNote(newNote, note.id, isLogin);
           if(response?.status === 200) {
             toast.success('Notatka została zmieniona');
             loadingData();
             setSelectedNote(null);
             setOption(null);
           }
        }catch(e) {
           toast.error('Coś poszło nie tak')
        }
    },[loadingData, note, setOption, setSelectedNote]);

    const handleCloseModal = useCallback(() => {
        setSelectedNote(null);
        setOption(null)
    }, [setOption, setSelectedNote]);

    return (
        <div className="popupColors">
            <div className="popupColors__palette">
                {colors.map((color, index) =>
                    <div
                        key={index}
                        className='popupColors__palette-color'
                        style={{ backgroundColor: color }}
                        onClick={() => handleChangeColor(color)}
                    ></div>)
                }
            </div>
            <button
                className='popupColors__button'
                onClick={handleCloseModal}
            >
                Zamknij
            </button>
                <ToastContainer/>
        </div>

    )
}