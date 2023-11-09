import { useEffect, useState } from 'react';
import { useNoteContext } from '../../../context/Context';
import { NotesInDay } from '../../Popups/NotesInDay/NotesInDay';
import './Notifications.scss';
import { NoteType } from '../../../utils/Types';
import { editPartNote } from "../../../API/api";
import {toast, ToastContainer} from 'react-toastify';
import { useCallback } from "react";
import { correlateDaysWithDates, getDaysInMonth, getFirstDay, getMonth, getMonthName, getYear, howDaysInMonth } from '../../../utils/utils';

export const Nofications = () => {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [notesInDay, setNotesInDay] = useState<NoteType[] | null>(null);

    const month = getMonth();
    const year = getYear();
    const { shownNotes } = useNoteContext();
    const days = howDaysInMonth(month);
    const allDaysInMonth = correlateDaysWithDates(year, month, days);
    const firstDay = getFirstDay();

    useEffect(() => {
        const newNote = shownNotes.map((note: NoteType) => {
            const notification = note.notification?.toString() ?? null;
            return { ...note, notification }
        });

        setNotes(newNote);
    }, [shownNotes]);

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
            const response = await editPartNote(newNote, note.id);
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


    return (
        <div className='calendar'>
            <NotesInDay 
                notesInDay={notesInDay} 
                setNotesInDay={setNotesInDay} 
                handleClearNotification={handleClearNotification}
            />
            <h2 style={{margin: '0 auto 2rem'}}>{getMonthName(month)}</h2>
            <div className={`calendar calendar--mon-${days} calendar--start-${firstDay}`}>
                {getDaysInMonth(days).map((day, index) =>
                    <div
                        className='calendar__day'
                        key={index}
                        onClick={() => handlePopupDay(day)}
                    >
                        <p style={{padding: '2px', margin: '0 3px'}}>{day}</p>
                        {findNote(day) && 
                            <div className='calendar__day-more'>
                                <div
                                    className='calendar__day-note'
                                    style={{ backgroundColor: `${findNote(day)?.color}` }}

                                >
                            <p style={{fontSize: '8px', margin: '0 auto'}}>{findNote(day)?.title}</p>
                            <p style={{fontSize: '5px'}}>{findNote(day)?.content}</p>
                                </div>
                        </div>}
                    </div>)}
            </div>
            <ToastContainer/>
        </div>
    )
};
