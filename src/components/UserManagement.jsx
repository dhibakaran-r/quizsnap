import React, { useEffect, useState } from 'react'
import { IoMdSearch } from 'react-icons/io';
import { clearData, searchData } from '../states/slices/SearchSlice';
import { useDispatch } from 'react-redux';

const UserDetails = React.lazy(() => import('./UserDetails'));

function UserManagement() {

  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  useEffect(()=>{
    console.log("h");
    
  })

  const handleChange = (e) =>{
    setInput(e);
  }
   
  const setFind = () =>{
    dispatch(searchData(input));
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setFind();
    }
  };

  const clearIp=()=>{
    // setInput("")
    dispatch(clearData());

  }
  return (
  
    <>
      {/* <Suspense fallback={<div className='w-full h-dvh flex justify-center items-center'> */}
                            {/* <MutatingDots visible={true} height="100" width="100" color="#0144CB" secondaryColor="#3572EF" radius="12.5" ariaLabel="mutating-dots-loading" wrapperStyle={{}} wrapperClass=""/> */}
                            {/* <p className='text-secondary text-3xl flex'>Fetching Data </p><p><LineWave visible={true} height="100" width="100" color="#3572EF" ariaLabel="line-wave-loading" wrapperStyle={{}} wrapperClass="" firstLineColor="" middleLineColor="" lastLineColor=""/></p> */}
                          {/* </div>}> */}
          <h1 className='flex justify-center items-center text-3xl text-textlg tracking-widest'>User Management</h1>

          <div className="top-block-2">
           
            <div className='search-block'>
                <div className='flex items-center'>  
                    <input type="text" name='search' className='w-96 outline-none py-2 ps-10 pe-4 border-none bg-[#dbdbdb] rounded-[50px]' onKeyDown={handleKeyPress} onClick={()=>clearIp()} onChange={(e)=>handleChange(e.target.value)} placeholder='Search' />
                    <span className='relative right-8 bg-bgno p-2 rounded-e-[50px] cursor-pointer group text-2xl items-center justify-center' onClick={()=> setFind()}><IoMdSearch className='group-hover:text-success'/></span>
                </div>
            </div>

          </div>

          <UserDetails />

      {/* </Suspense> */}
      </>
    
  )
}

export default UserManagement





