import React, { useEffect, useState } from 'react'
import { TbLoader3, TbScoreboard } from 'react-icons/tb';

function McqResult() {


    const [result, setResult] = useState(null);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        const retrievedData = localStorage.getItem("objectData");
        if (retrievedData) {
            setResult(JSON.parse(retrievedData));
            setLoad(false);
            localStorage.removeItem("objectData");
        }
    }, []);
    console.log(result);

    return (
        // <section className='flex flex-col justify-between items-center gap-40'>
        <div className='flex flex-col justify-center items-center gap-20'>
            {load ? <div className='w-full h-96 flex justify-center items-center text-primary text-3xl'>Loading Data <TbLoader3 className='animate-spin' /></div> : <>
                <div className='flex justify-center items-center'>
                    <h1 className='text-3xl'>{result.mcq} ( {result.level} ) MCQ Result</h1>
                </div>

                <div className=' h-40 p-4 flex justify-evenly items-center gap-4 border border-bluelg rounded-md'>
                    <div className='text-[10rem] text-primlight'><TbScoreboard /></div>
                    <div className='flex justify-center items-center gap-2'>
                        <div className='pr-4 flex flex-col justify-center items-center gap-2 border-r border-r-bluelg'>
                            <h1 className='text-3xl'>Total Score</h1>
                            <p className='text-2xl font-bold text-bluetext'>{result.qes.length}</p>
                        </div>
                        <div className='pl-2 flex flex-col justify-center items-center gap-2'>
                            <h1 className='text-3xl'>Your Score</h1>
                            <p className='text-2xl font-bold text-primary'>{result.res}</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col mx-40 xl:mx-60 justify-around gap-16'>

                    {

                        result.qes.map((q, i) => {
                            return (

                                <div key={i} className='flex flex-col justify-around gap-4'>
                                    <p className='text-xl'><span className='me-4'>{i + 1}.</span>{q.question}</p>
                                    <div className=' flex flex-wrap'>
                                        {q.options.map((opt, id) => {
                                            return (
                                                <div className=' h-8 flex justify-center items-center gap-2 ms-8'>
                                                    <input type='radio' key={id} id={`${q.id}+${opt}`}
                                                        name={`question-${q.id}`}
                                                        value={opt}
                                                        checked={result.ans[q.id] === opt}
                                                        className='accent-primary'
                                                        disabled

                                                    />
                                                    <label className={` ${opt === q.correct_answer ? 'text-success' : ''}`} >{opt}</label>

                                                </div>

                                            )
                                        })}
                                    </div>
                                    <div className='flex items-center gap-4 text-xl font-bold'><span>Correct Answer:</span> <span className=' text-primary'>{q.correct_answer}</span></div>
                                    <div className='flex items-center gap-4 text-xl font-bold'><span>Your Answer:</span> <span className={` ${result.ans[q.id] === q.correct_answer ? 'text-success' : 'text-redbg'}`}>{result.ans[q.id] ? result.ans[q.id] : 'Not answering'}</span></div>
                                </div>

                            )
                        })
                    }
                </div>

                {/* <FooterIn /> */}
                {/* </section> */}
            </>}
            <p className='pb-5 text-sm lg:text-md text-textgray text-center italic tracking-widest leading-3'>&copy; QuizSnap 2024</p>
        </div>
    )
}

export default McqResult