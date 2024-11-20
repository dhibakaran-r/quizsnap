import { getAuthData, getRole, removeAuthData } from "./dataStorage";

export const isAuthenticated = () => {
  return getAuthData() != null ? true : false;
};

// export const CheckAdmin = () => {
//     const [isAdmin, setAdmin] = useState(false);
//     useEffect(() =>{

//         UserDataAPI().then((res) => {
//         const email = {email:res.data.users[0].email};
//         console.log(email.email);
//         if(email.email === 'admin@quizsnap.com'){
//             setAdmin(true);
//             }
//         }).catch((err) => {
//             console.log(err);
//         }).finally(() => {

//         })
//     },[])

//     return isAuthenticated() ? isAdmin  : null;

// }

export const checkAdmin = () => {
  return getRole();
};

export const logout = () => {
  removeAuthData();
};
