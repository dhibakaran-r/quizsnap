import { collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../service/firebase/firebaseConfig';
import { FaCode, FaCss3Alt, FaHtml5, FaJsSquare, FaPython, FaReact } from 'react-icons/fa';
import { SiMysql } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { CgArrowsExpandUpRight } from "react-icons/cg";
import { fetchData } from '../service/fetchData';

function Explore() {

    const [allCategory, setAllCategories] = useState([]);

    const categoryRef = collection(db, 'mcqCategory');
    const fetchCategories = () => {
        const allCat = fetchData(categoryRef, setAllCategories);
        return () => allCat();
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const icons = {
        HTML: <FaHtml5 className='text-htmlic' />,
        CSS: <FaCss3Alt className='text-cssic' />,
        Javascript: <FaJsSquare className='text-jsic' />,
        React: <FaReact className='text-reactic' />,
        Python: <FaPython className='text-bluetext' />,
        Mysql: <SiMysql className='text-secondary' />
    }

    return (
        <div className='w-full flex flex-col justify-center items-center gap-10'>

            <h1 className='text-3xl font-bold'>Explore Categories</h1>
            {allCategory.length > 0 ?
                <div className='w-full flex flex-col md:flex-row md:flex-wrap justify-center lg:justify-start 2xl:justify-center items-center'>
                    {
                        allCategory.map((category, i) => {
                            return (
                                <Link to={`/quiz/explore/${category.category}`}>
                                    <div className='w-72 flex flex-col p-4 justify-center items-center gap-4 m-8 shadow-2xl border-t border-lggray rounded-t-lg hover:-translate-y-2 duration-300 group'>
                                        <div className='flex justify-center items-center gap-8 '>
                                            <p className='text-[3.5rem] md:text-[5rem]'>{icons[category.category] || <FaCode className='text-primlight' />}</p>
                                            <p className='text-2xl md:text-3xl'>{category.category}</p>
                                        </div>
                                        <p className='cursor-pointer duration-200 flex font-bold text-md md:text-lg group-hover:text-primary tracking-widest justify-center items-center'
                                        >View <CgArrowsExpandUpRight /></p>
                                    </div>
                                </Link>
                            )
                        })

                    }
                </div> : <div className='text-xl font-bold text-redbg text-center'>No Category</div>
            }
        </div>
    )
}

export default Explore