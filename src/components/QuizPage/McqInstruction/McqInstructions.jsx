import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { isAuthenticated } from '../../../service/Auth';
import { UserDataAPI } from '../../../service/Api';
import CryptoJS from "crypto-js";
import { TbTimeDuration30 } from "react-icons/tb";
import { MdFormatListNumbered } from "react-icons/md";
import { GiArrowScope } from 'react-icons/gi';
import { Helmet } from 'react-helmet-async';


function McqInstructions() {

  const [userData, setUserData] = useState({ name: "", email: "", uid: "" });

  useEffect(() => {
    if (isAuthenticated()) {

      UserDataAPI().then((res) => {

        setUserData({ name: res.data.users[0].displayName, email: res.data.users[0].email, uid: res.data.users[0].localId });

      }).catch((err) => {

      }).finally(() => {

      })
    }

  }, []);


  const { mcqid, mcqlevel } = useParams();
  const location = useLocation();
  const fileName = location.state;

  const secKey = 'getMCQfileName@76';
  const encName = CryptoJS.AES.encrypt(fileName, secKey).toString();

  const quickIn = [
    {
      title: "Test Duration",
      dtl: "30 Minutes",
      icon: <TbTimeDuration30 size={30} />
    },
    {
      title: "Total Questions",
      dtl: "30 Questions",
      icon: <MdFormatListNumbered size={30} />
    },
  ]

  const instructions = [
    {
      point: "This is a timed test. Once started, the timer cannot be paused, so ensure you are not interrupted."
    },
    {
      point: "You will be presented with 30 questions in total, divided into sets of 10 questions per page."
    },
    {
      point: "Each question has four options, and only one is correct."
    },
    {
      point: "You can navigate between questions using the `Next page` and `Previous page` buttons."
    },
    {

      point: "You can navigate back to the previous set of questions at any time."
    },
    {
      point: "You can move to the next page without answering all questions on the current page."
    },
    {
      point: "After submitting the quiz, you will receive immediate feedback and your score."
    },
    {
      point: "You cannot change your answers after submitting the test."
    },
    {
      point: "Make sure your internet connection is stable to avoid disruptions during the test."
    },
  ]

  return (
    // <div className='flex flex-col gap-40'>
    <div className='w-full flex flex-col justify-center gap-20 lg:flex-row'>
      <Helmet><title>MCQ Instructions</title></Helmet>

      <div className='lg:w-2/5 flex flex-col gap-24 lg:gap-48 ms-4 md:ms-12'>
        <Link to='/' className='text-secondary text-2xl font-semibold '>QuizSnap</Link>

        <div className='flex flex-col gap-8'>

          <p className='flex text-xl text-textlg tracking-widest'>Hay {userData.name},</p>
          <p className='w-full lg:w-11/12 tracking-wide text-4xl leading-[3rem] md:text-5xl md:leading-[4rem] font-bold p-4 capitalize'>welcome to quizsnap {mcqid} <span className='text-cssic'>({mcqlevel})</span> skill test</p>
          <div className='flex flex-row gap-10 md:gap-16'>
            {
              quickIn.map((inc, index) => {
                return (
                  <div className='flex flex-col gap-4' key={index}>
                    <p className='flex justify-center items-center gap-2 text-[14px] text-textgray'>{inc.icon}{inc.title}</p>
                    <p className='text-center text-xl text-secgray'>{inc.dtl}</p>
                  </div>
                )
              })
            }

          </div>
        </div>
      </div>

      <div className='p-8 lg:w-1/2 flex flex-col gap-20 md:gap-40'>
        <p className='hidden md:block w-full tracking-wide leading-8 text-xl'>
          You're about to embark on a quiz journey that will challenge your knowledge and help you master key concepts across multiple categories and levels of difficulty. Please read the following instructions carefully before starting the quiz.
        </p>

        <div className='flex flex-col gap-8'>

          <p className='text-4xl text-textlg tracking-wider ms-4 md:ms-0'>Instructions</p>

          <ul className='list-disc flex flex-col text-[16px] gap-4 mx-6 md:ms-8 text-secgray'>
            {
              instructions.map((points, index) => {
                return (
                  <li key={index} className='duration-200 md:hover:scale-105'>{points.point}</li>
                )
              })
            }
          </ul>
          <p className='text-[16px] text-secgray ms-4 md:ms-0'>These instructions will ensure clarity and a smooth user experience during the quiz, for more details <Link to='/detailinfo' className='underline text-secondary hover:text-primary italic'>click here</Link>.</p>
        </div>
        <div className='w-full flex items-center justify-center'>
          <button className='px-10 py-2 text-bluebg bg-primary flex justify-center items-center gap-2 rounded-full text-xl hover:bg-secondary tracking-widest'><Link to={`/quiz/testpage/${mcqid}/${mcqlevel}/${encodeURIComponent(encName)}`}
            target='_blank'
          >Start</Link> <GiArrowScope className='' size={40} /></button>
        </div>
      </div>

    </div>
    // </div>
  )
}

export default McqInstructions