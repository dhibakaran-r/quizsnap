import React from 'react'
import { Routes, Route } from 'react-router-dom' 
import QSNav from '../components/QSNav'
import AdminDashboard from '../components/AdminDashboard'
import McqManagement from '../components/McqManagement'
import ContentManagement from '../components/ContentManagement'
import UserManagement from '../components/UserManagement'
import McqPage from '../components/McqPage'
import UserProfile from '../components/UserProfile'
import AccessRoute from './AccessRoute'
import McqInstructions from '../components/McqInstructions'
import McqTest from '../components/McqTest'


function QSAdmin() {

  return (
    <div>
        <QSNav />
        <section className='flex flex-col gap-24 md:ms-40 2xl:ms-60 relative top-24'>
          <Routes>
            <Route element={<AccessRoute />}>
              <Route path='/admindashboard' element={<AdminDashboard />}/>
              <Route path='/qsmcq' element={<McqManagement />}/>
              <Route path='/qscontent' element={<ContentManagement />}/>
              <Route path='/qsusers' element={<UserManagement />}/>
              <Route path='/mcqs' element={<McqPage />}/>
              <Route path='/testpage' element={<McqTest/>} />
              <Route path='/instructions/:mcqid' element={<McqInstructions/>} />
              <Route path='/userprofile' element={<UserProfile/>} />
            </Route>
          </Routes>
        </section>
  
    </div>
  )
}

export default QSAdmin