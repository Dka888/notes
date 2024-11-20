import { useCallback } from 'react';
import { useNoteContext } from '../../../../context/Context';
import { NoteType } from '../../../../utils/Types';
import './NoteOptions.scss';
import { toast } from 'react-toastify';
import { deleteNote } from '../../../../API/api';

interface NoteOptionsProps {
    isHover: boolean,
    functions: { 
        handleOpenCalendar: () => void, 
        handleOpenColor: () => void, 
        handleOpenOthers: () => void,
    },        
    handleMoveToBush: () => Promise<void>,
    note: NoteType
}

export const NoteOptions = ({isHover, functions, note, handleMoveToBush }: NoteOptionsProps) => {
    const {  handleOpenCalendar, handleOpenColor, handleOpenOthers } = functions;
    const {editionNote, loadingData} = useNoteContext();

    const handleDeleteNote = useCallback(async () => {
        try {
            const response = await deleteNote(note.id);
            if (response?.status === 204) {
                toast.success('Notatka została usunięta');
                loadingData();
            }
        } catch (error) {
            toast.error('Nie udało się usunąć notatkę')
        }
    },[note.id, loadingData]);

    return(
        <div 
            className = {`noteOptions ${isHover ? 'hover' : ''}`} 
        >
        <img
            src="/notifications.svg"
            alt="notifications"
            className='noteOptions-notifications noteOptions-item'
            onClick={handleOpenCalendar}
        />
        <img src="/palette.svg" alt="palette"
            className='noteOptions-palette noteOptions-item'

            onClick={handleOpenColor}
        />
        <img src="/pen.svg" alt='pen'
            className='noteOptions-palette noteOptions-item'
            onClick={() => editionNote(note)}
        />
        {note.forDelete ?<img src='/delete.svg' alt='delete'
            className='noteOptions-palette noteOptions-item'
            onClick={handleDeleteNote}
        />
        :<img src='/delete.svg' alt='delete'
            className='noteOptions-palette noteOptions-item'
            onClick={handleMoveToBush}
        />}
        <img src="/dots.svg" alt="dots"
            className='noteOptions-dots noteOptions-item'
            onClick={handleOpenOthers}
        />
    </div >
    )
}