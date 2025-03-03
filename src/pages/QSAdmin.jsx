import React from 'react'
import { Routes, Route } from 'react-router-dom'
import QSNav from '../components/QSNav'
import AdminDashboard from '../components/QSAdmin/AdminDashboard/AdminDashboard'
import McqManagement from '../components/QSAdmin/McqManagement/McqManagement'
import ContentManagement from '../components/QSAdmin/ContentManagement/ContentManagement'
import UserManagement from '../components/QSAdmin/UserManagement/UserManagement'
import McqPage from '../components/McqPage'
import UserProfile from '../components/UserProfile'
import AccessRoute from './AccessRoute'
import McqInstructions from '../components/QuizPage/McqInstruction/McqInstructions'
import McqTest from '../components/QuizPage/McqTest/McqTest'
import { Helmet } from 'react-helmet-async'
import ExploreCategory from '../components/QuizPage/ExploreCategory/ExploreCategory'


function QSAdmin() {

  return (
    <div>
      <Helmet>
        <title>QuizSnap Admin</title>
      </Helmet>
      <QSNav />
      <section className='flex flex-col justify-center items-center gap-24 mx-4 relative top-24 lg:ms-40'>
        <Routes>
          <Route element={<AccessRoute />}>
            <Route path='/admindashboard' element={<AdminDashboard />} />
            <Route path='/qsmcq' element={<McqManagement />} />
            <Route path='/qscontent' element={<ContentManagement />} />
            <Route path='/qsusers' element={<UserManagement />} />
            <Route path='/mcqs' element={<McqPage />} />
            <Route path='/testpage' element={<McqTest />} />
            <Route path='/instructions/:mcqid' element={<McqInstructions />} />
            <Route path='/userprofile' element={<UserProfile />} />
            <Route path='/explore/:mcqid' element={<ExploreCategory />} />
          </Route>
        </Routes>
      </section>

    </div>
  )
}

export default QSAdmin