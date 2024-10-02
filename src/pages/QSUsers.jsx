import React from 'react';
import { Routes, Route } from 'react-router-dom' 
import QSNav from '../components/QSNav';
import Dashboard from '../components/Dashboard';
import McqPage from '../components/McqPage';
import UserProfile from '../components/UserProfile';
import McqTest from '../components/McqTest';
import McqInstructions from '../components/McqInstructions';

function QSUsers() {
  
  return (
    <div>

        <QSNav />
        <section className='flex flex-col gap-24 md:ms-40 2xl:ms-60 relative top-24'>
          <Routes>
              <Route path='/dashboard' element={<Dashboard/>} />
              <Route path='/mcqs' element={<McqPage/>} />
              <Route path='/testpage' element={<McqTest/>} />
              <Route path='/instructions/:mcqid' element={<McqInstructions/>} />
              <Route path='/userprofile' element={<UserProfile/>} />
         
          </Routes>
        </section>

    </div>
  )
}

export default QSUsers