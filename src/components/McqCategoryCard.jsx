import React from 'react'
import qes from '../assets/datas/questions.json'
import { Link } from 'react-router-dom'
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaCode, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { RxCaretRight } from "react-icons/rx";

function McqCategoryCard() {

    const icons = {
        HTML: <FaHtml5 size={150} />,
        CSS: <FaCss3Alt size={150} />,
        JavaScript: <FaJsSquare size={150} />,
        React: <FaReact size={150} />,

    }

    return (
        <div className='container w-full md:w-11/12 flex flex-col lg:flex-row flex-wrap justify-start items-center gap-8'>
            {
                qes.categories.map((que, index) => {
                    return (
                        <div key={index} className='bg-bgimg9 bg-cover relative overflow-hidden group w-11/12 md:w-full lg:w-[30%] h-auto p-4 flex  justify-around border border-xltgray shadow-[0_1px_8px_2px] shadow-lggray duration-300 hover:shadow-none rounded-md'>
                            <div className=' w-full flex flex-col justify-around items-center z-10 relative  '>
                                <p className='text-textsec text-3xl'>{que.category}</p>
                                <Link to={`/quiz/instructions/${que.category}`}>
                                    <p className='flex items-center justify-center gap-0 text-textlg capitalize text-xl duration-300 hover:text-primary group'>Start now <RxCaretRight className='duration-300 group-hover:translate-x-1' /></p>
                                </Link>
                            </div>
                            <div className=' flex justify-around items-center text-xl'>
                                <p className='bg text-xltgray group-hover:text-stgray rounded-full p-2 z-10 relative'>{icons[que.category] || <FaCode size={150} />}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default McqCategoryCard