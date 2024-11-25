import { useEffect, useState } from 'react';
import { useNoteContext } from '../../../context/Context';
import { NotesInDay } from '../../Popups/NotesInDay/NotesInDay';
import './Notifications.scss';
import { NoteType } from '../../../utils/Types';
import { editPartNote } from "../../../API/api";
import {toast, ToastContainer} from 'react-toastify';
import { useCallback } from "react";
import { 
    correlateDaysWithDates, 
    getDaysInMonth, 
    getFirstDay, 
    getMonth, 
    getMonthName, 
    getYear, 
    howDaysInMonth
} from '../../../utils/utils';
import classNames from 'classnames';
import { ModalCreateNote } from '../../Popups/ModalCreateNote/ModalCreateNote';

export const Nofications = () => {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [notesInDay, setNotesInDay] = useState<NoteType[] | null>(null);

    const [month, setMonth] = useState(getMonth());
    const [year, setYear] = useState(getYear());
    const { shownNotes } = useNoteContext();

    const days = howDaysInMonth(month);
    const allDaysInMonth = correlateDaysWithDates(year, month, days);
    const firstDay = getFirstDay(month, year);
    const weekendsDay = ["Sat", "Sun"];

    useEffect(() => {
        const newNote = shownNotes.map((note: NoteType) => {
            const notification = note.notification?.toString() ?? null;
            return { ...note, notification }
        });

        setNotes(newNote);
    }, [shownNotes]);

    const handleChangeMonthForward = useCallback(() => {
        if(month > 10) {
            setMonth(0);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    }, [month, year]);

    const handleChangeMonthBack = useCallback(() => {
        if(month < 1) {
            setMonth(11);
            setYear(year - 1)
        } else {
            setMonth(month - 1)
        }
    }, [month, year])

    function findNote( day: number) {
        return notes.find(note => note.notification === allDaysInMonth[day]);
     }

    const handlePopupDay = (day: number) => {
        const notesDay = notes.filter(note => note.notification === allDaysInMonth[day]) ?? null;
        setNotesInDay(notesDay)
    }

    const handleClearNotification = useCallback(async(note: NoteType) => {
        const newNote = {...note};
        newNote.notification = null;
        try {
            const response = await editPartNote(newNote, note.id, isLogin);
            if(response?.status === 200) {
                toast.success('Notyfikacja usunięta'); 
                const newNotes = notesInDay?.filter(noteDay => noteDay.id !== note.id) ?? [];
                setNotesInDay(newNotes);
                setNotes((state) => 
                    state.filter(st => st.id !== note.id)
                )
            }
        } catch(e){
            toast.error('Coś poszło nie tak')
        }
    },[notesInDay]);


    const [openCreator, setOpenCreator] = useState(false);
    const [dateInfo, setDateInfo] = useState<Date | undefined>(undefined);

    const handleCreateNote = (day: number, month: number, year: number) => {
        const date = new Date(year, month, day + 1)
        setOpenCreator(true);
        setDateInfo(date);
    }

    const closeNoteModalCreator = () => {
        setOpenCreator(false);
    }


    return (
        <div className='calendar'>
            <NotesInDay 
                notesInDay={notesInDay} 
                setNotesInDay={setNotesInDay} 
                handleClearNotification={handleClearNotification}
            />
            <ModalCreateNote 
                closeNoteModalCreator={closeNoteModalCreator} 
                noteModalCreator={openCreator}
                dateInfo={dateInfo}
            />
            <div className='calendar__header'>
                <button 
                    className='calendar__header-button'
                    onClick={handleChangeMonthBack}    
                >&larr;</button>
                <h2 style={{margin: '0 auto 2rem'}}>{getMonthName(month)} {year}</h2>
                <button 
                    className='calendar__header-button'
                    onClick={handleChangeMonthForward}    
                >&rarr;</button>
            </div>
            <div className='calendar__daysTitle'>
                <div className='calendar__daysTitle-day'>Poniedziałek</div>
                <div className='calendar__daysTitle-day'>Wtorek</div>
                <div className='calendar__daysTitle-day'>Środa</div>
                <div className='calendar__daysTitle-day'>Czwartek</div>
                <div className='calendar__daysTitle-day'>Piątek</div>
                <div className='calendar__daysTitle-day'>Sobota</div>
                <div className='calendar__daysTitle-day'>Niedziela</div>
            </div>
            <div className={`calendar calendar--mon-${days} calendar--start-${firstDay}`}>
                {getDaysInMonth(days).map((day, index) => {
                    
                    const dayIn = new Date(year, month, day).toDateString().split(' ')[0];
                    const weekend = weekendsDay.some(_day => _day === dayIn); 

                   return (<div
                        className={classNames('calendar__day', {"weekend": weekend})}
                        key={index}
                        onClick={findNote(day) ? () => handlePopupDay(day) : () => handleCreateNote(day, month, year)}
                    >
                        <p style={{padding: '2px', margin: '0 3px'}}>{day}</p>
                        {findNote(day) && 
                            <div className='calendar__day-more'>
                                <div
                                    className='calendar__day-note'
                                    style={{ backgroundColor: `${findNote(day)?.color}` }}

                                >
                                    <p style={{fontSize: '8px', margin: 'auto'}}>{findNote(day)?.title}</p>
                                    <p style={{fontSize: '5px'}}>{findNote(day)?.content}</p>
                                </div>
                        </div>}
                    </div>)
                })}
            </div>
            <ToastContainer/>
        </div>
    )
};
