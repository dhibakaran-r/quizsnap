import React, { useEffect, useState } from 'react'
import qes from '../assets/datas/questions.json'
import { Link } from 'react-router-dom'
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaCode, FaArrowLeft, FaArrowRight} from "react-icons/fa";
import { RxCaretRight } from "react-icons/rx";

function McqPage() {

  const icons = {
    HTML : <FaHtml5 size={150}/>    ,
    CSS : <FaCss3Alt size={150}/>,
    JavaScript : <FaJsSquare size={150}/>,
    React : <FaReact size={150}/>,

  }
  useEffect(()=>{
  })

  return (
    <>
      <h1 className='flex justify-center items-center text-3xl text-textlg tracking-widest'>MCQ Catalog</h1>
      <div className='w-11/12 flex flex-wrap justify-evenly items-center gap-8'>
        {
            qes.categories.map((que, index)=>{
                return(
                <div key={index} className='testcard relative overflow-hidden w-4/12 h-auto p-4 flex  justify-around border-2 border-x-primary border-y-bluelg hover:border-x-bluelg hover:border-y-primary shadow-[0_1px_8px_2px] shadow-shadbg duration-300 hover:shadow-none rounded-md'>
                    <div className=' w-full flex flex-col justify-around items-center z-10 relative  '>
                        <p className='text-textsec text-3xl'>{que.category}</p> 
                        <Link to={`/qsuser/instructions/${que.category}`}>
                          <p className='flex items-center justify-center gap-0 text-textlg capitalize text-xl duration-300 hover:text-primary group'>take {que.category} quiz now <RxCaretRight className='duration-300 group-hover:translate-x-1' /></p>
                        </Link>
                    </div>
                    <div className=' flex justify-around items-center text-xl'>
                        <p className='bg text-outlg rounded-full p-2 z-10 relative'>{icons[que.category] || <FaCode size={150} />}</p>
                    </div>
                </div>
                )
            })
        }
      </div>
        {/* <div className='w-11/12 flex flex-wrap justify-around items-center p-4'>
          {
            qes.categories.map((cat, i) => { return(

                <div className='card'>{cat.category}</div>

              )})

          }

        </div> */}
    </>
   

  )
}

export default McqPage