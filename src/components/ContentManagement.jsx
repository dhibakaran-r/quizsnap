import React from 'react'
import { Helmet } from 'react-helmet-async'

function ContentManagement() {
  return (
    <>
      <Helmet><title>QuizSnap Contents</title></Helmet>
      <div className='text-3xl flex justify-center items-center relative top-96 text-textlg h-full w-full'>Content</div>
    </>
  )
}

export default ContentManagement