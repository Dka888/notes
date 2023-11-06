import { useEffect, useState } from 'react';
import { useNoteContext } from '../../../context/Context';
import { NotesInDay } from '../../Popups/NotesInDay/NotesInDay';
import './Notifications.scss';
import { NoteType } from '../../../utils/Types';
import { editPartNote } from "../../../API/api";
import {toast, ToastContainer} from 'react-toastify';
import { useCallback } from "react";

export const Nofications = () => {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    const { shownNotes } = useNoteContext();

    function howDaysInMonth(month: number) {
        if (month === 4 || month === 6 || month === 10) {
            return 30;
        }
        if (month === 2) {
            return 28
        }
        return 31
    }
    const days = howDaysInMonth(month);

    function getDaysInMonth(year: number, month: number) {
        const daysInMonth = new Date(year, month, 0).getDate();
        const daysArray = [];

        for (let day = 1; day <= daysInMonth; day++) {
            daysArray.push(day);
        }

        return daysArray;
    }

    function correlateDaysWithDates(year: number, month: number) {
        const daysArray = getDaysInMonth(year, month);
        const correlatedDates = [];

        for (const day of daysArray) {
            const date = new Date(year, month - 1, day).toISOString();
            correlatedDates.push(date);
        }

        return correlatedDates;
    }

    const allDaysInMonth = correlateDaysWithDates(year, month);


    const d = new Date();
    const firstDay = new Date(d.getFullYear(), d.getMonth(), 1).toString().split(' ')[0];

    const [notes, setNotes] = useState<NoteType[]>([])

    useEffect(() => {
        const newNote = shownNotes.map(note => {
        const notification = note.notification?.toString() ?? null;
        return { ...note, notification }
    });
        setNotes(newNote);
    }, [shownNotes]
    )
    function findNote(day: number) {
        return notes.find(note => note.notification === allDaysInMonth[day]);
    }

    const getMonthName = (month: number) => {
        switch(month) {
            case 1: return 'Styczeń';
            case 2: return 'Luty';
            case 3: return 'Marzec';
            case 4: return 'Kwiecień';
            case 5: return 'Maj';
            case 6: return 'Czerwiec';
            case 7: return 'Lipiec';
            case 8: return 'Sierpień';
            case 9: return 'Wrzesień';
            case 10: return 'Październik';
            case 11: return 'Listopad';
            case 12: return 'Grudzień';
        }
    }

    const [notesInDay, setNotesInDay] = useState<NoteType[] | null>(null);

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
                {getDaysInMonth(year, month).map((day, index) =>
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
