import React from 'react'
import { useParams } from 'react-router-dom'


function McqInstructions() {

    const {mcqid} = useParams();

    return (
    <>
    <h1 className='flex justify-center items-center text-3xl text-textlg tracking-widest'>Welcome to QuizSnap!</h1>
    <p className='flex justify-center items-center w-full tracking-wide leading-8 text-xl p-4'>
    You're about to embark on a quiz journey that will challenge your knowledge and help you master key concepts across multiple categories and levels of difficulty. Please read the following instructions carefully before starting the quiz.
    </p>
    <h2>{mcqid}</h2>

  </>
  )
}

export default McqInstructions