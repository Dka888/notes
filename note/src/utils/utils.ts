export const colors = ['white', '#AFEEEE', '#FFB6C1', '#8FBC8F', '#F0E68C', '#E9967A'];
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export function checkValidEmail(email: string) {
   return emailRegex.test(email);
}

export function getMonth() {
   return new Date().getMonth();
} 

export function getYear() {
   return new Date().getFullYear();
}

export function howDaysInMonth(month: number) {
    if (month === 1) {
        return 28
    } 
    
    if (month % 2 !== 0) {
        return 30;
    }

    return 31
}


export function getDaysInMonth(day: number) {
   const daysArray = [];

   for (let i = 1; i <= day; i++) {
       daysArray.push(i);
   }

   return daysArray;
}

export function correlateDaysWithDates(year: number, month: number, day: number) {
    const daysArray = getDaysInMonth(day);
    const correlatedDates = [];

    for (const day of daysArray) {
        const date = new Date(year, month, day).toISOString();
        correlatedDates.push(date);
    }

    return correlatedDates;
}

export function getDay(date: Date) {
    return (Number(date.toString().split(' ')[2]) + 1);
}

export function getFirstDay(month: number) {
   const day = new Date();
   return new Date(day.getFullYear(), month, 1).toString().split(' ')[0];
}

export const getMonthName = (month: number) => {
   switch(month) {
       case 0: return 'Styczeń';
       case 1: return 'Luty';
       case 2: return 'Marzec';
       case 3: return 'Kwiecień';
       case 4: return 'Maj';
       case 5: return 'Czerwiec';
       case 6: return 'Lipiec';
       case 7: return 'Sierpień';
       case 8: return 'Wrzesień';
       case 9: return 'Październik';
       case 10: return 'Listopad';
       case 11: return 'Grudzień';
   }
}

