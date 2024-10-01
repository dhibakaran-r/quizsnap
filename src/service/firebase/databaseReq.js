import { collection, getDoc, query } from "firebase/firestore"
import { db } from "./firebaseConfig"
import { useState } from "react";

export const GetUserData = async() =>{
    const [userDatas, setUserDatas] = useState([]);
    let users = [];
    const qry = query(collection(db, "users"));
    const datasnapshot = getDoc(qry);
    datasnapshot.forEach((ele) => {
        users.push({...ele.data(), id:ele.id})
    });
    setUserDatas(users);
    return userDatas;
}