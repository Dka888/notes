import './NoteOptions.scss';

interface NoteOptionsProps {
    isHover: boolean,
    handleAddToArchive: () => void,
    functions: { 
        handleOpenCalendar: () => void, 
        handleOpenColor: () => void, 
        handleOpenOthers: () => void,
    },
}

export const NoteOptions = ({isHover, functions, handleAddToArchive }: NoteOptionsProps) => {
    const {  handleOpenCalendar, handleOpenColor, handleOpenOthers } = functions;

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
        <img
            src='/archive.svg'
            alt='archive'
            className='noteOptions-archive noteOptions-item'
            onClick={handleAddToArchive}
        />
        <img src="/palette.svg" alt="palette"
            className='noteOptions-palette noteOptions-item'

            onClick={handleOpenColor}
        />
        <img src="/dots.svg" alt="dots"
            className='noteOptions-dots noteOptions-item'
            onClick={handleOpenOthers}
        />
    </div >
    )
}