export const colors = ['white', '#AFEEEE', '#FFB6C1', '#8FBC8F', '#F0E68C', '#E9967A'];
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export function checkValidEmail(email: string) {
   return emailRegex.test(email);
}

export function getMonth() {
   return new Date().getMonth() + 1;
} 

export function getYear() {
   return new Date().getFullYear();
}

export function howDaysInMonth(month: number) {
    if (month === 4 || month === 6 || month === 10) {
        return 30;
    }
    if (month === 2) {
        return 28
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
        const date = new Date(year, month - 1, day).toISOString();
        correlatedDates.push(date);
    }

    return correlatedDates;
}

export function getFirstDay() {
   const day = new Date();
   return new Date(day.getFullYear(), day.getMonth(), 1).toString().split(' ')[0];
}

export const getMonthName = (month: number) => {
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

