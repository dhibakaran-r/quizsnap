import React from 'react'
import UserLists from '../UserLists/UserLists';
import FooterIn from '../../FooterIn';

function UserManagement() {


  return (

    <>
      <h1 className='flex justify-center items-center text-3xl text-textlg tracking-widest'>User Management</h1>

      <UserLists />

      <FooterIn />
    </>

  )
}

export default UserManagement





