import React from 'react'
import { Helmet } from 'react-helmet-async'

function UserProfile() {
  return (
    <>
      <Helmet><title>QuizSnap UserProfile</title></Helmet>
      <div className='text-3xl flex justify-center items-center relative top-96 text-textlg h-full w-full'>User Profile</div>
    </>
  )
}

export default UserProfile