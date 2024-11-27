import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../service/firebase/firebaseConfig';
import { AiTwotoneEdit } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { TbLoader3 } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';
import useric from '../assets/images/useric.png'
import { Helmet } from 'react-helmet-async';

function UserLists() {

  const [userDatas, setUserDatas] = useState([]);
  const [load, setLoad] = useState(true);
  const [bgBlur, setBlur] = useState(false);
  // const [editData, setEditData] = useState([{ id: '', firstname: '', lastname: '', email: '' }]);
  const [delData, setDelData] = useState('');
  // const [editPopup, setEditPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);

  // const handleData = (e) => {
  //   setEditData({ ...editData, [e.target.name]: e.target.value });
  // }

  const getUserData = async () => {
    let users = [];
    const qry = query(collection(db, "users"));
    const datasnapshot = await getDocs(qry);
    datasnapshot.forEach((ele) => {
      users.push({ ...ele.data(), id: ele.id })
    });
    setUserDatas(users);
    setLoad(false);
  }

  // search filter operation

  const searchText = useSelector((state) => state.search.search)
  //  console.log("search"+searchText);

  let filterDatas = [...userDatas];

  if (searchText) {
    filterDatas = userDatas.filter((theuser) => {
      if (theuser.firstname.toLowerCase().includes(searchText) || theuser.lastname.toLowerCase().includes(searchText) || theuser.email.toLowerCase().includes(searchText) || theuser.id.includes(searchText) || theuser.joinedat?.toDate().toLocaleString().includes(searchText)) {
        return theuser;
      }
    })
  }

  // console.log(filterDatas);

  // search operation end

  // const showEditPopup = (data) => {
  //   setEditPopup(true);
  //   setDeletePopup(false);
  //   setBlur(!bgBlur);
  //   setEditData(data);
  // };

  const showDeletePopup = (data) => {
    setDeletePopup(true);
    // setEditPopup(false);
    setBlur(!bgBlur);
    setDelData(data);
  };

  const closePopup = () => {
    // setEditPopup(false);
    setDeletePopup(false);
    setBlur(false);
    setDelData('')
  };

  // const updateUser = async () => {

  //   await updateDoc(doc(db, "users", editData.id), {
  //     firstname: editData.firstname,
  //     lastname: editData.lastname,
  //     email: editData.email
  //   });
  //   setEditPopup(false);
  //   setBlur(false);
  //   getUserData()

  // }

  const deleteUser = async (id) => {

    await deleteDoc(doc(db, "users", id));
    setDeletePopup(false);
    setBlur(false);
    getUserData()
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (

    <div className='w-full flex lg:flex-row flex-col lg:flex-wrap gap-8 xl:justify-evenly justify-center items-center mb-8'>
      <Helmet><title>QuizSnap Userslist</title></Helmet>
      {load ? <div className='w-full h-96 flex justify-center items-center text-primary text-3xl'>Loading Data <TbLoader3 className='animate-spin' /></div> : <>

        {
          filterDatas.map((data, index) => {
            return (

              <div key={index} className={' relative bg-bgimg2 bg-cover border-2 border-secbr  lg:w-[46%] w-11/12 h-60 p-4 flex flex-col md:flex-row justify-evenly items-center rounded-md duration-150 hover:scale-[1.02]'}>

                <div className='flex flex-row gap-16 md:flex-col justify-around items-center md:gap-2'>
                  <LazyLoadImage className='block w-12 md:w-40' src={useric} effect='blur' placeholderSrc={useric} />
                  {/* <p className='text-[12px] text-textgray relative block md:hidden '>joined@{data.joinedat?.toDate().toLocaleString()}</p> */}
                  <div className='flex flex-row items-center justify-center gap-2 md:gap-6'>

                    {/* <button className={"p-2 flex justify-center items-center gap-2 bg-outlg text-primary duration-300 hover:bg-primary hover:text-bluebg rounded-full"}
                      onClick={bgBlur ? null : () => showEditPopup(data)}><AiTwotoneEdit /></button> */}

                    <button className={"flex gap-2 justify-center items-center px-4 py-2 text-sm bg-outlg duration-300 text-redbg border border-redbg hover:bg-redbg hover:text-bluebg rounded-full"}
                      onClick={bgBlur ? null : () => showDeletePopup(data.id)}><MdOutlineDeleteOutline /> Delete</button>

                  </div>
                </div>

                <div className='flex flex-col gap-4'>

                  <p className='text-[12px] text-textgray relative hidden md:block md:left-24 lg:left-11 2xl:left-32 -top-2 md:-top-4 lg:-top-2'>joined@{data.joinedat?.toDate().toLocaleString()}</p>

                  <div className='flex justify-start items-center text-sm md:text-xl gap-6'>
                    <p className='text-textgray text-start'>User ID </p>
                    <p className='text-center text-secondary'> {data.id}</p>
                  </div>

                  <div className='flex justify-start items-center text-sm md:text-xl gap-6'>
                    <p className='text-textgray text-start'>First Name </p>
                    <p className='text-center text-secondary'> {data.firstname}</p>
                  </div>

                  <div className='flex justify-start items-center text-sm md:text-xl gap-6'>
                    <p className='text-textgray text-start'>Last Name </p>
                    <p className='text-center text-secondary'> {data.lastname}</p>
                  </div>

                  <div className='flex justify-start items-center text-sm md:text-xl gap-6'>
                    <p className='text-textgray text-start'>Email ID </p>
                    <p className='text-center text-secondary'> {data.email}</p>
                  </div>


                </div>

              </div>

            )
          })}

      </>}



      {/* popup */}

      {/* {editPopup && (
        <div className="popup-card absolute p-2 w-[50rem] h-[25rem] flex flex-col justify-around items-center">

          <div className=" w-3/5 lg:w-11/12 flex justify-between items-center">
            <p className='text-xl font-bold'>Update User Record</p>
            <p className="bg-redbg rounded-full p-1 cursor-pointer" onClick={closePopup}>
              <RxCross2 />
            </p>
          </div>

          <div className="w-full flex justify-center items-center gap-4">
            <label htmlFor="ID">User ID</label>
            <input type="text" name="ID" id="ID"
              className='w-[70%] bg-bgno cursor-not-allowed'
              value={editData.id}
              onChange={handleData}
              readOnly
            />
          </div>

          <div className='w-full flex items-center justify-center gap-16'>

            <div className="flex justify-center items-center gap-4">
              <label htmlFor="firstname">First Name</label>
              <input type="text" name="firstname" id="fname"
                value={editData.firstname}
                onChange={handleData}
              />
            </div>

            <div className="flex justify-center items-center gap-4">
              <label htmlFor="lastname">Last Name</label>
              <input type="text" name="lastname" id="lname"
                value={editData.lastname}
                onChange={handleData}
              />
            </div>

          </div>

          <div className="w-full flex justify-center items-center gap-4">
            <label htmlFor="email">E-mail</label>
            <input type="email" name="email" id="email"
              className='w-[70%]'
              value={editData.email}
              onChange={handleData}
            />
          </div>
          <div>
            <button className="px-4 py-2 flex justify-center items-center gap-2 bg-secondary text-bluebg border rounded-md duration-200 hover:text-primary hover:bg-bluebg hover:border-primary"
              onClick={() => updateUser()}
            >Update</button>
          </div>

        </div>
      )} */}
      {deletePopup && (
        <div className="popup-card fixed top-48  w-[40rem] h-[20rem] flex flex-col justify-around items-center">
          <div className="w-11/12 flex justify-between items-center">
            <p className='text-xl font-bold'>Delete User Record</p>
            <p className="bg-redbg rounded-full p-1 cursor-pointer" onClick={closePopup}>
              <RxCross2 />
            </p>
          </div>

          <div className="w-full flex flex-col justify-center items-center gap-4">
            <p id='ID' className='font-semibold'>User ID: {delData}</p>
            <p className='text-xl font-bold'>Are You sure, you want to delete this user!</p>
            <button className="px-4 py-2 flex justify-center items-center gap-2 border bg-redbg text-bluebg rounded-md duration-200 hover:text-redbg hover:bg-bluebg hover:border-redbg" onClick={() => deleteUser(delData)}><span><MdOutlineDeleteOutline /></span><span>Delete</span></button>
          </div>
        </div>
      )}
    </div>
  )

}

export default UserLists