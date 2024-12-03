import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaCode, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { RxCaretRight } from "react-icons/rx";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../service/firebase/firebaseConfig';
import { TbLoader3 } from 'react-icons/tb';

function ExploreCategory() {

    const [load, setLoad] = useState(true);
    const [allCategory, setAllCategories] = useState([]);
    const [chooseCategory, setChooseCategory] = useState([]);
    const { mcqid } = useParams();

    const catRef = collection(db, "mcqFiles");
    const categoryRef = collection(db, 'mcqCategory');

    // Fetch categories from Firestore
    useEffect(() => {
        const fetchAllCategories = async () => {
            try {
                const querySnapshot = await getDocs(catRef);
                const cats = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setChooseCategory(cats);
                setLoad(false);
            } catch (error) {
                console.error("Error fetching files:", error);
            }
        };
        fetchAllCategories();
    }, []);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const query = await getDocs(categoryRef);
                const cats = query.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setAllCategories(cats);
            } catch (error) {
                console.error("Error fetching files:", error);
            }
        };

        fetchCategories();
    }, [allCategory]);


    const icons = {
        HTML: <FaHtml5 />,
        CSS: <FaCss3Alt />,
        Javascript: <FaJsSquare />,
        React: <FaReact />,

    }

    return (
        <div className='container w-full md:w-11/12 flex flex-col lg:flex-row flex-wrap justify-start items-center gap-12'>
            {load ? <div className='w-full h-96 flex justify-center items-center text-primary text-3xl'>Loading Data <TbLoader3 className='animate-spin' /></div> : <>

            <div className='flex flex-col justify-center items-center gap-8'>
                <h1 className='text-3xl font-bold mb-4'>Explore {mcqid} MCQ's</h1>
                <p className='text-xl font-bold mb-14 tracking-wide text-primary'>"Welcome to QuizSnap! Explore a variety of categories, each offering 3 levels: Basic, Intermediate, and Advanced. 
                    Whether you're a beginner or looking to deepen your knowledge, our quizzes are structured to help you learn and test your understanding effectively."</p>
                {
                    allCategory.map((det, i)=>{ return( det.category === mcqid ? <>
                        <div className='flex flex-col justify-center items-center gap-8'>
                            <div className='flex justify-center items-center gap-8 p-8 border border-bluedk shadow-2xl'>
                                <h1 className='w-80 text-lg font-bold'>Basic Level</h1>
                                <p className='ps-8 text-lg font-semibold border-bluedk border-l'>{det.basicDesc}</p>
                            </div>
                            <div className='flex justify-center items-center gap-8 p-8 border border-textsec shadow-2xl'>
                                <h1 className='w-80 text-lg font-bold'>Intermediate Level</h1>
                                <p className='ps-8 text-lg font-semibold border-textsec border-l'>{det.interDesc}</p>
                            </div>
                            <div className='flex justify-center items-center gap-8 p-8 border border-redbg shadow-2xl'>
                                <h1 className='w-80 text-lg font-bold'>Advanced Level</h1>
                                <p className='ps-8 text-lg font-semibold border-redbg border-l'>{det.advDesc}</p>
                            </div>
                        </div>
                        </>:<></>)})
                }
            </div>
                {
                    chooseCategory.map((cat, index) => {
                        return ( cat.category === mcqid ? <>
                            <div key={index} className='bg-bgimg9 bg-cover relative overflow-hidden group w-11/12 md:w-full lg:w-[30%] h-auto p-4 flex  justify-around border border-xltgray shadow-[0_1px_8px_2px] shadow-lggray duration-300 hover:shadow-none rounded-md'>
                                <div className=' w-full flex flex-col justify-around items-center z-10 relative  '>
                                    <p className='flex flex-col justify-center items-center text-textsec text-xl md:text-3xl 2xl:text-3xl lg:text-xl'>{cat.category} <span>( {cat.level} )</span></p>
                                    <Link to={`/quiz/instructions/${cat.category}/${cat.level}`} state={cat.name}>
                                        <p className='flex items-center justify-center gap-0 text-textlg capitalize text-xl duration-300 hover:text-primary group'>Start now <RxCaretRight className='duration-300 group-hover:translate-x-1' /></p>
                                    </Link>
                                </div>
                                <div className=' flex justify-around items-center text-xl'>
                                    <p className='bg text-xltgray group-hover:text-stgray rounded-full text-[5rem] md:text-[10rem] 2xl:text-[10rem] lg:text-[5rem] p-2 z-10 relative'>{icons[cat.category] || <FaCode />}</p>
                                </div>
                            </div></> :<></>
                        )
                    })
                }
            </>}
        </div>
    )
}

export default ExploreCategory