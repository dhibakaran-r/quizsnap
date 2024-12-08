import React, { useEffect, useState } from 'react'
// import qes from '../assets/datas/HTMLBasic.json'
import CryptoJS from 'crypto-js';
import { ref, uploadBytesResumable, deleteObject, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../service/firebase/firebaseConfig";
import { LuClock12 } from "react-icons/lu";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaCode } from "react-icons/fa";
import { GrDocumentVerified } from "react-icons/gr";
import { toast, ToastContainer } from 'react-toastify';
import { shuffleArray } from '../utils/shuffle';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
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
    const navigate = useNavigate();

    const { mcqid, mcqlevel, encName } = useParams();

    const secKey = 'getMCQfileName@76';
    let decName = '';
    // dec filename
    useEffect(() => {
        
        try {
            const byte = CryptoJS.AES.decrypt(decodeURIComponent(encName), secKey);
            decName = byte.toString(CryptoJS.enc.Utf8);
        } catch (error) {
            console.error("Decryption fail:", error);
        }
    }, [])
    
    // select mcq file
    
    useEffect(() => {
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
        
        fetchQuestions();
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
        HTML: <FaHtml5 size={50} />,
        CSS: <FaCss3Alt size={50} />,
        Javascript: <FaJsSquare size={50} />,
        React: <FaReact size={50} />,

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
                        <div className='w-full flex justify-between items-center bg-outlg p-8'>
                            <div className=' flex flex-row justify-center items-center gap-2'>{icons[mcqid] || <FaCode size={50} />} <span className='font-bold'>{mcqid} ( {mcqlevel} )</span></div>
                            <div className='w-40 flex flex-row justify-center items-center gap-2 p-4  rounded-full '>
                                <LuClock12 size={50} className='clockSpin' />
                                <span className='text-2xl font-bold text-textsec'>{formatTime(timeLeft)}</span>
                            </div>
                        </div>
                        <div className='flex flex-col ms-2 justify-around gap-16'>

                            {
                                // shuffledQuestions && shuffledQuestions
                                currentQes && currentQes.map((q, i) => {
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
                        <button className="px-20 py-2 flex justify-center items-center gap-2 bg-lggray text-bluebg border rounded-md duration-200 hover:text-primary hover:bg-bluebg hover:border-primary"
                            onClick={prevPage} disabled={currentPage === 1}
                        ><BiChevronsLeft /> Previous page</button>
                        <button className="px-20 py-2 bg-bgwhite text-stgray border rounded-md" disabled>
                            Page {currentPage} of {Math.ceil(shuffledQuestions.length / quePerPage)}
                        </button>
                        <button className="px-20 py-2 flex justify-center items-center gap-2 bg-lggray text-bluebg border rounded-md duration-200 hover:text-primary hover:bg-bluebg hover:border-primary"
                            onClick={nextPage} disabled={currentPage === Math.ceil(shuffledQuestions.length / quePerPage)}
                        ><BiChevronsRight /> Next page</button>
                    </div>
                    {currentPage === Math.ceil(shuffledQuestions.length / quePerPage) ?

                        <div className='flex justify-center items-center'>
                            <button className="px-60 py-2 flex justify-center items-center gap-2 bg-secondary text-bluebg border rounded-md duration-200 hover:text-primary hover:bg-bluebg hover:border-primary"
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
                        onClick={()=> setResults()}
                        >Show Result</Link>
                        </div>

                </div>)}
            </>}
            <ToastContainer />
        </div>
    )
}

export default McqTest