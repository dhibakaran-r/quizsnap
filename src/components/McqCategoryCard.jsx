import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaCode, FaPython } from "react-icons/fa";
import { RxCaretRight } from "react-icons/rx";
import { collection } from 'firebase/firestore';
import { db } from '../service/firebase/firebaseConfig';
import { TbLoader3 } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { SiMysql } from 'react-icons/si';
import { fetchData } from '../service/fetchData';

function McqCategoryCard() {

    const [load, setLoad] = useState(true);
    const [allCategory, setAllCategory] = useState([]);

    const categoryRef = collection(db, "mcqFiles");

    // Fetch categories from Firestore
    const fetchAllCategories = () => {
        const allCat = fetchData(categoryRef, setAllCategory);
        return ()=> allCat();
    };
    useEffect(() => {
        fetchAllCategories();
        setLoad(false);
    }, []);


    // search filter operation

    const searchText = useSelector((state) => state.search.search)
    //  console.log("search"+searchText);

    let filterDatas = [...allCategory];

    if (searchText) {
        filterDatas = allCategory.filter((files) => {
            if (files.name.toLowerCase().includes(searchText) || files.category.toLowerCase().includes(searchText) || files.level.toLowerCase().includes(searchText)) {
                return files;
            }
        })
    }

    const icons = {
        HTML: <FaHtml5 />,
        CSS: <FaCss3Alt />,
        Javascript: <FaJsSquare />,
        React: <FaReact />,
        Python: <FaPython />,
        Mysql: <SiMysql />

    }

    return (
        <div className='container w-full md:w-11/12 flex flex-col lg:flex-row flex-wrap justify-start items-center gap-8'>
            {load ? <div className='w-full h-96 flex justify-center items-center text-primary text-3xl'>Loading Data <TbLoader3 className='animate-spin' /></div> : <>
                {
                    filterDatas.map((cat, index) => {
                        return (
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
                            </div>
                        )
                    })
                }
            </>}
        </div>
    )
}

export default McqCategoryCard