export const storeData = ((data) => {
    localStorage.setItem('idToken', data)
})

export const getAuthData = () => {
    return localStorage.getItem('idToken');
}

export const getRole = () =>{
    let role = localStorage.getItem('role');
    let isadmin;
    if(role === 'admin'){
        isadmin = true;
    }else{
        isadmin = false;
    }
    
    return  isadmin;
}

const alltokens = (tokens) =>{
    tokens.forEach((tokens) => {
        localStorage.removeItem(tokens);
    });
}

export const removeAuthData = () => {
    return alltokens(['idToken', 'role']);
}