import React, { useEffect, useState } from 'react'
import { IoMdSearch } from 'react-icons/io';
import { clearData, searchData } from '../states/slices/SearchSlice';
import { useDispatch } from 'react-redux';

function SearchBar() {

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
    <div className="top-block-2">
           
            <div className='search-block'>
                <div className='flex items-center'>  
                    <input type="text" name='search' className='w-96 outline-none py-2 ps-10 pe-4 border-none bg-[#dbdbdb] rounded-[50px]' onKeyDown={handleKeyPress} onClick={()=>clearIp()} onChange={(e)=>handleChange(e.target.value)} placeholder='Search' />
                    <span className='relative right-8 bg-bgno p-2 rounded-e-[50px] cursor-pointer group text-2xl items-center justify-center' onClick={()=> setFind()}><IoMdSearch className='group-hover:text-success'/></span>
                </div>
            </div>

          </div>
  )
}

export default SearchBar