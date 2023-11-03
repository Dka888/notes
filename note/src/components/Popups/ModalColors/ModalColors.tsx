
import { useCallback } from 'react';
import './ModalColors.scss';
import { NoteType } from '../../../utils/Types';
import { editPartNote } from '../../../API/api';
import { useNoteContext } from '../../../context/Context';


interface ModalColorsProps {
    handleCloseModalColors: (modalColors: boolean) => void,
    note: NoteType,
}

const colors = ['white', 'grey', 'red', 'green', 'yellow', 'blue'];

export const ModalColors = ({ handleCloseModalColors, note }: ModalColorsProps) => {
    const {loadingData} = useNoteContext();

    const handleChangeColor = useCallback(async(color: string) => {
        const newNote = {...note};
        newNote.color = color;
        try {
            const response = await editPartNote(newNote, note.id);
           if(response?.status === 200) {
             loadingData();
             handleCloseModalColors(false);
           }
           
        }catch(e) {
            console.log(e);
        }
    },[handleCloseModalColors, loadingData, note]);

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
                onClick={() => handleCloseModalColors(false)}
            >Zamknij</button>

        </div>

    )
}