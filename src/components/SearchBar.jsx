import React, { useEffect, useState } from 'react'
import { IoMdSearch } from 'react-icons/io';
import { clearData, searchData } from '../states/slices/SearchSlice';
import { useDispatch } from 'react-redux';

function SearchBar() {

  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("h");

  })

  const handleChange = (e) => {
    setInput(e);
  }

  const setFind = () => {
    dispatch(searchData(input));
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setFind();
    }
  };

  const clearIp = () => {
    // setInput("")
    dispatch(clearData());

  }

  return (
    <div className='ms-2 flex items-center'>
      <input type="text" name='search' className='w-48 md:w-60 outline-none py-1 md:py-2 ps-5 md:ps-10 pe-2 md:pe-4 border-none bg-graylg rounded-md' onKeyDown={handleKeyPress} onClick={() => clearIp()} onChange={(e) => handleChange(e.target.value)} placeholder='Search' />
      <span className='relative right-8 bg-graylg p-1 rounded-e-md cursor-pointer group text-2xl items-center justify-center' onClick={() => setFind()}><IoMdSearch className='group-hover:text-primary' /></span>
    </div>


  )
}

export default SearchBar