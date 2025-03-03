import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import McqTest from '../components/QuizPage/McqTest/McqTest'
import McqInstructions from '../components/QuizPage/McqInstruction/McqInstructions'
import { Helmet } from 'react-helmet-async'
import McqResult from '../components/QuizPage/McqResult/McqResult'
import FooterIn from '../components/FooterIn'
import ExploreCategory from '../components/QuizPage/ExploreCategory/ExploreCategory'

function QuizPage() {
  const location = useLocation();

  const showFooter = ["/testpage/:mcqid/:mcqlevel/:encName", "/resultpage"]; 
  return (
    <section className='flex flex-col justify-center items-center gap-24 relative top-8'>
      <Helmet>
        <title>QuizSnap MCQ page</title>
      </Helmet>
        <Routes>
          <Route path='/explore/:mcqid' element={<ExploreCategory />} />
          <Route path='/instructions/:mcqid/:mcqlevel' element={<McqInstructions />} />
          <Route path='/testpage/:mcqid/:mcqlevel/:encName' element={<McqTest />} />
          <Route path='/resultpage' element={<McqResult />} />
        </Routes>
        {showFooter.includes(location.pathname) && <FooterIn />}
      </section>
  )
}

export default QuizPage