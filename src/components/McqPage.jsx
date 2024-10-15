import React, { useEffect, useState } from 'react'
import FooterIn from './FooterIn';
import McqCategoryCard from './McqCategoryCard';

function McqPage() {


  useEffect(() => {
  })

  return (
    <>
      <h1 className='flex justify-center items-center text-3xl text-textlg tracking-widest'>MCQ Catalog</h1>

      <div className='w-full flex justify-center items-center'>
        <McqCategoryCard />
      </div>

      <FooterIn />
    </>


  )
}

export default McqPage