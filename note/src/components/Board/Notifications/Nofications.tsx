import { useNoteContext } from '../../../context/Context';
import './Notifications.scss';


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

    const notes = shownNotes.map(note => {
        const notification = note.notification?.toString();
        return { ...note, notification }
    });

    function findNote(day: number) {
        return notes.find(note => note.notification === allDaysInMonth[day]);
    }

    return (
        <div className='calendar'>
            <div className={`calendar calendar--mon-${days} calendar--start-${firstDay}`}>
                {getDaysInMonth(year, month).map((day, index) =>
                    <div
                        className='calendar__day'
                        key={index}
                    >
                        {day}
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
        </div>
    )
};
