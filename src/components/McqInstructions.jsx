import React from 'react'
import { useParams } from 'react-router-dom'


function McqInstructions() {

    const {mcqid} = useParams();

    return (
    <>
    <h1 className='flex justify-center items-center text-3xl text-textlg tracking-widest'>Welcome to the QuizSnap Challenge</h1>
    <h2>{mcqid}</h2>
  </>
  )
}

export default McqInstructions