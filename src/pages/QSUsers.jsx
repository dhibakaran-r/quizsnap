import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../components/Dashboard';
import McqPage from '../components/McqPage';
import UserProfile from '../components/UserProfile';
import McqTest from '../components/QuizPage/McqTest/McqTest';
import TopNav from '../components/TopNav';
import { Helmet } from 'react-helmet-async';
import ExploreCategory from '../components/QuizPage/ExploreCategory/ExploreCategory';

function QSUsers() {

  return (
    <div>
      <Helmet>
        <title>QuizSnap User</title>
      </Helmet>
      <TopNav />
      <section className='flex flex-col gap-24 mx-4 relative top-24'>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/mcqs' element={<McqPage />} />
          <Route path='/testpage' element={<McqTest />} />
          <Route path='/userprofile' element={<UserProfile />} />
          <Route path='/explore/:mcqid' element={<ExploreCategory />} />

        </Routes>
      </section>

    </div>
  )
}

export default QSUsers