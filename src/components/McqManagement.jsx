import React, { useState } from 'react';
import McqUpload from './McqUpload';
import SelectedMCQ from './SelectedMCQ';
import FooterIn from './FooterIn';

const McqManagement = () => {

  

  return (
    <>
      <h1 className='flex justify-center items-center text-3xl text-textlg tracking-widest'>MCQ Management</h1>
      <McqUpload />
      {/* <SelectedMCQ /> */}
      <FooterIn />
    </>
  );
};

export default McqManagement;
