const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export function checkValidEmail(email: string) {
   return emailRegex.test(email);
}

export function checkLoginUser() {
   
    const userData = localStorage.getItem('UserValidation');
    console.log(userData);

    return !!userData;
}