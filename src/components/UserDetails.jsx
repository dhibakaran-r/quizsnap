import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../service/firebase/firebaseConfig';
import { AiTwotoneEdit } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { TbLoader3 } from 'react-icons/tb';


function UserDetails() {

  const [userDatas, setUserDatas] = useState([]);
  const [load, setLoad] = useState(true);
  const [bgBlur, setBlur] = useState(false);
  const [editData, setEditData] = useState([{id:'', firstname:'', lastname:'', email:''}]);
  const [delData, setDelData] = useState('');
  const [editPopup, setEditPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  
  const handleData = (e) =>{
    setEditData({ ...editData, [e.target.name]: e.target.value });
  }
  
  const getUserData = async() =>{
    let users = [];
    const qry = query(collection(db, "users"));
    const datasnapshot = await getDocs(qry);
    datasnapshot.forEach((ele) => {
        users.push({...ele.data(), id:ele.id})
    });
    setUserDatas(users);
    setLoad(false);
 }

  const showEditPopup = (data) => {
    setEditPopup(true);
    setDeletePopup(false);
    setBlur(!bgBlur);
    setEditData(data);
  };
 
  const showDeletePopup = (data) => {
    setDeletePopup(true);
    setEditPopup(false);
    setBlur(!bgBlur);
    setDelData(data);
  };

  const closePopup = () => {
    setEditPopup(false);
    setDeletePopup(false);
    setBlur(false);
    setDelData('')
  };

  const updateUser = async() => {
    
    await updateDoc(doc(db, "users", editData.id),{
      firstname : editData.firstname,
      lastname : editData.lastname,
      email : editData.email
    });
    setEditPopup(false);
    setBlur(false);
    getUserData()

  }
 
  const deleteUser = async(id) => {

    await deleteDoc(doc(db, "users", id));
    setDeletePopup(false);
    setBlur(false);
    getUserData()
  }

  useEffect(() => {
    getUserData()
  },[])

  return (

    <div className='w-11/12 flex flex-col justify-center items-center relative'> 
      {load ? <div className='w-full h-96 flex justify-center items-center text-primary text-3xl'>Loading Data <TbLoader3 className='animate-spin'/></div> : <>
        <table className={bgBlur ? "p-4 w-11/12 blur-md" : "p-4 w-11/12"}>
              <thead className='h-20'>
                  <tr className='th-p text-center bg-outlg border-[1rem] border-bluebg rounded-md'>
                      <th>Sno</th>
                      <th>ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th> 
                      <th>Created at</th>   
                      <th></th> 
                      <th></th>   
                  </tr>  
              </thead>
              <tbody className=''>
            {
               userDatas.map((data, index) => {
                return (

                  <tr key={index} className={bgBlur ? 'th-p h-24 text-center bg-outlg border-[1rem] border-bluebg rounded-md':'th-p h-24 text-center bg-outlg border-[1rem] border-bluebg rounded-md duration-300 hover:scale-105'}>
                    <td>{index+1}</td>
                    <td>{data.id}</td>
                    <td>{data.firstname}</td>
                    <td>{data.lastname}</td>
                    <td>{data.email}</td>
                    <td>{data.joinedat?.toDate().toLocaleString()}</td>
                    <td className=''>
                        <button className={bgBlur ? "px-4 py-2 flex justify-center items-center gap-2 bg-secondary text-bluebg rounded-md cursor-default" : "px-4 py-2 flex justify-center items-center gap-2 border bg-secondary text-bluebg rounded-md duration-200 hover:text-primary hover:bg-bluebg hover:border-primary"} 
                        onClick={bgBlur ? null : () => showEditPopup(data)}><span><AiTwotoneEdit /></span><span>Edit</span></button>
                    </td>
                    <td>
                        <button className={bgBlur ? "px-4 py-2 flex justify-center items-center gap-2 bg-redbg text-bluebg rounded-md cursor-default" : "px-4 py-2 flex justify-center items-center gap-2 border bg-redbg text-bluebg rounded-md duration-200 hover:text-redbg hover:bg-bluebg hover:border-redbg"} 
                        onClick={bgBlur ? null : () => 
                        showDeletePopup(data.id)

                        }><span><MdOutlineDeleteOutline /></span><span>Delete</span></button>
                    </td>
                  </tr>

              )})}
              </tbody>
          </table> 
          </>}
              


          {/* popup */}

          {editPopup && (
              <div className="popup-card absolute p-2 w-1/2 h-5/6 flex flex-col justify-around items-center">
                
                 <div className="w-11/12 flex justify-between items-center">
                      <p className='text-xl font-bold'>Update User Record</p>
                      <p className="bg-redbg rounded-full p-1 cursor-pointer" onClick={closePopup}>
                        <RxCross2/>
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
            )}
            {deletePopup && (
                <div className="popup-card absolute w-1/2 h-2/3 flex flex-col justify-around items-center">
                  <div className="w-11/12 flex justify-between items-center">
                      <p className='text-xl font-bold'>Delete User Record</p>
                      <p className="bg-redbg rounded-full p-1 cursor-pointer" onClick={closePopup}>
                          <RxCross2/>
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

export default UserDetails




