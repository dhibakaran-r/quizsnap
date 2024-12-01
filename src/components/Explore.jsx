import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../service/firebase/firebaseConfig';
import { FaCode, FaCss3Alt, FaHtml5, FaJsSquare, FaPython, FaReact } from 'react-icons/fa';
import { SiMysql } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { CgArrowsExpandUpRight } from "react-icons/cg";

function Explore() {

    const [allCategory, setAllCategories] = useState([]);

    const categoryRef = collection(db, 'mcqCategory');
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
            <div className='w-3/5 flex flex-wrap justify-around items-center'>
                {
                    allCategory.map((category, i) => {
                        return (
                            <div className='w-60 flex flex-col p-4 justify-center items-center gap-4 m-8 shadow-2xl group'>
                                <div className='flex justify-center items-center gap-8 '>
                                    <p className='text-[5rem]'>{icons[category.id] || <FaCode className='text-primlight' />}</p>
                                    <p className='text-3xl'>{category.category}</p>
                                </div>
                                <Link className='hidden duration-200 group-hover:flex hover:text-primary font-bold text-lg tracking-widest justify-center items-center' 
                                to={`/quiz/explore/${category.category}`} >View <CgArrowsExpandUpRight /></Link>
                            </div>
                        )
                    })

                }
            </div>
        </div>
    )
}

export default Explore