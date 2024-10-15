import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { isAuthenticated } from '../service/Auth';
import { UserDataAPI } from '../service/Api';
// import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc } from 'firebase/firestore';
// import { db } from '../service/firebase/firebaseConfig';


function McqInstructions() {
 
  const [userData, setUserData] = useState({ name: "", email: "", uid: "" });

  useEffect(() => {
    if (isAuthenticated()) {

      UserDataAPI().then((res) => {

        setUserData({ name: res.data.users[0].displayName, email: res.data.users[0].email, uid: res.data.users[0].localId });

      }).catch((err) => {

      }).finally(() => {

      })
    }
   
  }, []);

  // const [userDatas, setUserDatas] = useState([]);
  // const getUserData = async () => {
  //   let users = [];
  //   const qry = query(collection(db, "users"));
  //   const datasnapshot = await getDocs(qry);
  //   datasnapshot.forEach((ele) => {
  //     users.push({ ...ele.data(), id: ele.id })
  //   });
  //   setUserDatas(users);
  // }
  const { mcqid } = useParams();

  // let uid = localStorage.getItem("idToken")
  // let filterDatas = "";

  // if (uid) {
  //   filterDatas = userDatas.filter((theuser) => {
  //     if (theuser.id.includes(uid)) {
  //       return theuser;
  //     }
  //   })
  // }
  // if (uid) {
  //   userDatas.map((user) => {
  //     if (user.id == uid) {
  //       console.log("in");
        
  //       filterDatas = user.firstname + user.lastname
  //     }
  //   })
  // }

  // useEffect(() => {
  //   getUserData()
  // })

  return (
    <div className='w-full flex flex-row justify-between items-center gap-4'>

      <div className='w-1/2 flex flex-col gap-48 ms-24'>
        <div className='text-secondary text-2xl font-semibold '>QuizSnap</div>

        <div>

        <p className='flex text-xl text-textlg tracking-widest'>Hay {userData.name},</p>
        <p className='w-1/2 tracking-wide text-5xl leading-[4rem] font-bold p-4 capitalize'>welcome to quizsnap {mcqid} skill test</p>
        {/* <p className='flex justify-center items-center w-full tracking-wide leading-8 text-xl p-4'>
          You're about to embark on a quiz journey that will challenge your knowledge and help you master key concepts across multiple categories and levels of difficulty. Please read the following instructions carefully before starting the quiz.
        </p> */}
        </div>
      </div>

      <div className='w-1/2 flex flex-col'>
        <h2>{mcqid}</h2>
      </div>

    </div>
  )
}

export default McqInstructions