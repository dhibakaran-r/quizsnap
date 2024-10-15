// name validator
export const nameValidator = name => {
    const nameRegex = /^[A-Za-z0-9@-]{3,}$/;
    return nameRegex.test(name);
}

// email validator
export const emailValidator = email => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
}

// password validator
export const passwordValidator = password => {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return passwordRegex.test(password);

}



