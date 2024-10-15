import React, { useEffect, useState } from 'react'
import qes from '../assets/datas/questions.json'
import { LuClock12 } from "react-icons/lu";
import { FaHtml5 as Htmlic } from "react-icons/fa";
import { GrDocumentVerified } from "react-icons/gr";
import { toast, ToastContainer } from 'react-toastify';

function McqTest() {

    const [timeLeft, setTimeLeft] = useState(30 * 60);
    const [isSubmit, setIsSubmit] = useState(false);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (timeLeft > 0 && !isSubmit) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            autoSubmit();
        }
    }, [timeLeft, isSubmit]);


    const autoSubmit = () => {
        setIsSubmit(true);
        toast.success("Time's Up, Your test submitted!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    const manualSubmit = () => {
        setIsSubmit(true);
        toast.success('Test Submitted Successfully!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    return (
        <div className='w-4/5 ms-16 p-16 flex flex-col gap-40 '>
            {!isSubmit ? (<>
                {qes.categories.map((que, i) => {
                    return (
                        <div className='flex flex-col gap-8'>
                            <div className='w-full flex justify-between items-center bg-outlg p-8'>
                                <div key={i} className='w-40 flex flex-row justify-center items-center gap-2'><Htmlic size={50} /> <span className='font-bold'>{que.category}</span></div>
                                <div className='w-40 flex flex-row justify-center items-center gap-2 p-4 bg-secondary rounded-full text-redbg'><LuClock12 size={50} className='clockSpin' /> <span className='text-2xl font-bold'>{formatTime(timeLeft)}</span></div>
                            </div>
                            <div className='flex flex-col justify-around gap-16'>
                                {/* if({que.levels === "easy"})  */}
                                {

                                    que.levels.easy.map((q, i) => {
                                        return (

                                            <div key={i} className='flex flex-col justify-around gap-4'>
                                                <p className='text-xl'><span className='me-4'>{i + 1}.</span>{q.question}</p>
                                                <div className=' flex flex-wrap'>
                                                    {q.options.map((opt, id) => {
                                                        return (
                                                            <div className=' h-8 flex justify-center items-center gap-2 ms-8'>
                                                                <input type='radio' key={id} id={opt} name={q.id} value={opt} />
                                                                <label htmlFor={opt}>{opt}</label>
                                                            </div>

                                                        )
                                                    })}
                                                </div>
                                            </div>

                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })}

                <div className='flex justify-center items-center'>
                    <button className="px-60 py-2 flex justify-center items-center gap-2 bg-secondary text-bluebg border rounded-md duration-200 hover:text-primary hover:bg-bluebg hover:border-primary"
                        onClick={manualSubmit}
                    >Submit</button>
                    <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
                </div>

            </>) : (<div className='bg-graylg w-full h-60 flex flex-col justify-around items-center rounded-md'>
                <div className='flex justify-center items-center gap-4 text-success'>
                    <GrDocumentVerified size={80} />
                    <span className='font-bold text-2xl'>Test Submitted!</span>
                </div>
                <div className='flex justify-center items-center'>
                    <button className="px-4 py-2 flex justify-center items-center gap-2 bg-secondary text-bluebg border rounded-md duration-200 hover:text-primary hover:bg-bluebg hover:border-primary"
                        onClick={""}
                    >Show Result</button>
                </div>

            </div>)}

        </div>
    )
}

export default McqTest