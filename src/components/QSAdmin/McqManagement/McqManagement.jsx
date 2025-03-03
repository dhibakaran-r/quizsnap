import React from 'react';
import McqUpload from '../McqUpload/McqUpload';
import FooterIn from '../../FooterIn';

const McqManagement = () => {

  

  return (
    <>
      <h1 className='flex justify-center items-center text-3xl text-textlg tracking-widest'>MCQ Management</h1>
      <McqUpload />
      <FooterIn />
    </>
  );
};

export default McqManagement;
