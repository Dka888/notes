
import { useCallback } from 'react';
import './ModalColors.scss';
import { NoteOption, NoteType } from '../../../utils/Types';
import { editPartNote } from '../../../API/api';
import { useNoteContext } from '../../../context/Context';


interface ModalColorsProps {
    setOption: (option: NoteOption | null) => void,
    note: NoteType,
    setSelectedNote: (selectedNote: NoteType | null) => void,
}

const colors = ['white', 'grey', 'red', 'green', 'yellow', 'blue'];

export const ModalColors = ({ setOption, note, setSelectedNote }: ModalColorsProps) => {
    const {loadingData} = useNoteContext();

    const handleChangeColor = useCallback(async(color: string) => {
        const newNote = {...note};
        newNote.color = color;
        try {
            const response = await editPartNote(newNote, note.id);
           if(response?.status === 200) {
             loadingData();
             setSelectedNote(null);
             setOption(null);
           }
           
        }catch(e) {
            console.log(e);
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

        </div>

    )
}