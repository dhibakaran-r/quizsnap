import React, { useEffect, useState } from 'react'
import CryptoJS from 'crypto-js';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../service/firebase/firebaseConfig";
import { LuClock12 } from "react-icons/lu";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaCode } from "react-icons/fa";
import { GrDocumentVerified } from "react-icons/gr";
import { shuffleArray } from '../utils/shuffle';
import { Link, useParams } from 'react-router-dom';
import { TbLoader3 } from 'react-icons/tb';
import { BiChevronsLeft, BiChevronsRight } from "react-icons/bi";

function McqTest() {

    const [timeLeft, setTimeLeft] = useState(30 * 60);
    const [isSubmit, setIsSubmit] = useState(false);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [totalScores, setScores] = useState(0);
    const [error, setError] = useState("");
    const [load, setLoad] = useState(true);

    const { mcqid, mcqlevel, encName } = useParams();

    const secKey = 'getMCQfileName@76';
    let decName = '';
    // dec filename
    try {
        const byte = CryptoJS.AES.decrypt(decodeURIComponent(encName), secKey);
        decName = byte.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error("Decryption fail:", error);
    }

    // select mcq file

    const fetchQuestions = async () => {
        try {
            const fileRef = ref(storage, `mcqFiles/${decName}`);
            const url = await getDownloadURL(fileRef);

            const response = await fetch(url);
            const data = await response.json();
            if (data.questions) {
                const shuffled = shuffleArray(data.questions).map((question) => ({
                    ...question,
                    options: shuffleArray(question.options),
                }));
                setShuffledQuestions(shuffled);
            }
            // setQuestions(data);
            setLoad(false);
            console.log(data);
            console.log(decName);

            // setError("");
        } catch (err) {
            console.error("Error fetching questions:", err);
            setError("Failed to fetch questions. Please check the file name or upload a valid file.");
        }
    };
    useEffect(() => {
        fetchQuestions();
        return () => fetchQuestions();
    }, []);

    // next prev page
    const quePerPage = 10;

    const startIndex = (currentPage - 1) * quePerPage;
    const endIndex = startIndex + quePerPage;
    const currentQes = shuffledQuestions.slice(startIndex, endIndex);

    const nextPage = () => {
        if (currentPage < Math.ceil(shuffledQuestions.length / quePerPage)) {
            setCurrentPage((prev) => prev + 1);
        }
    }

    const prevPage = () => {
        if (currentPage > 1)
            setCurrentPage((prev) => prev - 1);
    }
    // time display
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

    // auto submit

    const autoSubmit = () => {
        validateAns();
        setIsSubmit(true);
        // toast.success("Time's Up, Your test submitted!", {
        //     position: "top-center",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        // });
    }

    // manual submit

    const manualSubmit = () => {
        validateAns();
        setIsSubmit(true);
    }

    const validateAns = () => {
        let totalPoints = 0;
        shuffledQuestions.forEach((ans) => {
            if (selectedAnswers[ans.id] === ans.correct_answer) {
                totalPoints++;
            }
        })
        setScores(totalPoints);
        // toast.success('Test Submitted Successfully!', {
        //     position: "top-center",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        // });
    }

    const handleOptionSelect = (Id, opt) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [Id]: opt,
        }));
    };


    // dynamic Icon

    const icons = {
        HTML: <FaHtml5 className='text-[2rem] md:text-[3rem]' />,
        CSS: <FaCss3Alt className='text-[2rem] md:text-[3rem]' />,
        Javascript: <FaJsSquare className='text-[2rem] md:text-[3rem]' />,
        React: <FaReact className='text-[2rem] md:text-[3rem]' />,

    }

    const results = {
        mcq: mcqid,
        level: mcqlevel,
        qes: shuffledQuestions,
        ans: selectedAnswers,
        res: totalScores,

    }
    const setResults = () => {
        localStorage.setItem("objectData", JSON.stringify(results));
        // window.open("/quiz/resultpage", "_blank");
    };
    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <div className='w-4/5 flex flex-col gap-20 '>
            {load ? <div className='w-full h-96 flex justify-center items-center text-primary text-3xl'>Loading Data <TbLoader3 className='animate-spin' /></div> : <>
                {!isSubmit ? (<>

                    <div className='flex flex-col gap-8'>
                        <div className='w-full flex flex-col gap-4 bg-outlg p-4 md:p-8'>
                            <div className='flex justify-between items-center'>
                                <div className=' flex flex-col md:flex-row justify-center items-center gap-2'>
                                    {icons[mcqid] || <FaCode className='text-[2rem] md:text-[3rem]' />}
                                    <div className='font-semibold md:text-md md:font-bold flex flex-col md:flex-row justify-center items-center gap-0 md:gap-2'>
                                        <span>{mcqid}</span> 
                                        <span className='text-cssic'>({mcqlevel})</span></div>
                                </div>
                                <div className='w-40 flex flex-row justify-center items-center gap-2 rounded-full '>
                                    <LuClock12 className='text-[2rem] md:text-[3rem] clockSpin' />
                                    <span className='text-md md:text-2xl font-bold text-textsec'>{formatTime(timeLeft)}</span>
                                </div>
                            </div>
                            <p className='ms-4 text-md text-redbg'><span className='font-semibold'>Warning:</span>  Do not refresh the page, as it may cause your responses to be lost and the questions to be reshuffled.</p>
                        </div>
                        <div className='flex flex-col ms-4 gap-12'>

                            {
                                // shuffledQuestions && shuffledQuestions
                                currentQes && currentQes.map((q, i) => {
                                    return (

                                        <div key={i} className='flex flex-col justify-around gap-4'>
                                            <div className='text-lg md:text-xl flex flex-row gap-0 md:gap-4'>
                                                <span className='me-4'>{i + 1}.</span><span>{q.question}</span>
                                            </div>
                                            <div className=' flex flex-col items-start md:flex-row md:items-center md:flex-wrap'>
                                                {q.options.map((opt, id) => {
                                                    return (
                                                        <div className='w-full pb-4 flex gap-4 md:gap-2 ms-4 md:ms-12'>
                                                            <input type='radio' key={id} id={`${q.id}+${opt}`}
                                                                name={`question-${q.id}`}
                                                                value={opt}
                                                                checked={selectedAnswers[q.id] === opt} // Check if already selected
                                                                onChange={() => handleOptionSelect(q.id, opt)}
                                                            // onClick={()=>calcPoint(q.id, )}
                                                            />
                                                            <label htmlFor={`${q.id}+${opt}`}>{opt}</label>
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


                    <div className='w-full flex justify-between items-center'>
                        <button className="px-2 md:px-8 lg:px-20 py-2 flex justify-center items-center gap-2 text-xs md:text-lg bg-lggray text-bluebg border rounded-md duration-200 hover:text-primary hover:bg-bluebg hover:border-primary"
                            onClick={prevPage} disabled={currentPage === 1}
                        ><BiChevronsLeft /> Previous</button>
                        <button className="px-2 md:px-8 lg:px-20 py-2 bg-bgwhite text-stgray text-xs md:text-lg border rounded-md" disabled>
                            {currentPage} of {Math.ceil(shuffledQuestions.length / quePerPage)}
                        </button>
                        <button className="px-2 md:px-8 lg:px-20 py-2 flex justify-center items-center gap-2 text-xs md:text-lg bg-lggray text-bluebg border rounded-md duration-200 hover:text-primary hover:bg-bluebg hover:border-primary"
                            onClick={nextPage} disabled={currentPage === Math.ceil(shuffledQuestions.length / quePerPage)}
                        ><BiChevronsRight /> Next</button>
                    </div>
                    {currentPage === Math.ceil(shuffledQuestions.length / quePerPage) ?

                        <div className='flex justify-center items-center'>
                            <button className="px-10 md:px-60 py-2 flex justify-center items-center gap-2 bg-secondary text-bluebg border rounded-md duration-200 hover:text-primary hover:bg-bluebg hover:border-primary"
                                onClick={manualSubmit}
                            >Submit</button>
                        </div> : <div></div>

                    }

                </>) : (<div className='bg-graylg w-full h-60 mb-72 flex flex-col justify-around items-center rounded-md'>
                    <div className='flex justify-center items-center gap-4 text-success'>
                        <GrDocumentVerified size={80} />
                        <span className='font-bold text-2xl'>Test Submitted!</span>
                    </div>

                    <div className='flex justify-center items-center'>
                        <Link className="px-4 py-2 flex justify-center items-center gap-2 bg-secondary text-bluebg border rounded-md duration-200 hover:text-primary hover:bg-bluebg hover:border-primary"
                            to={'/quiz/resultpage'}
                            target='_blank'
                            // state={results}
                            onClick={() => setResults()}
                        >Show Result</Link>
                    </div>

                </div>)}
            </>}
        </div>
    )
}

export default McqTest