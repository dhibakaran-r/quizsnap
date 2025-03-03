import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import tumb1 from '../../../assets/images/totmcq.jpg'
import tumb2 from '../../../assets/images/totuser.jpg'
import tumb3 from '../../../assets/images/actmcq.jpg'
import { SiDatabricks } from "react-icons/si";
import { LiaUsersSolid } from "react-icons/lia";
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app, storage } from '../../../service/firebase/firebaseConfig';
import { TbLoader3 } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { ref, listAll } from "firebase/storage";
import { MdOutlineCategory } from 'react-icons/md';

function AdminCard() {

    const [usersCount, setUsersCount] = useState(0);
    const [mcqCount, setMcqCount] = useState(0);
    const [catCount, setCatCount] = useState(0);
    
    const firestore = getFirestore(app);
    
    const fetchCount = async () => {

        try {
            const usercollections = collection(firestore, 'users');
            const totalCounts = await getDocs(usercollections);
            setUsersCount(totalCounts.size);
        } catch (err) {
            setUsersCount(err);
        }
        
        const folderRef = ref(storage, 'mcqFiles'); 
        
        try {
            const folderContents = await listAll(folderRef);
            const totalFiles = folderContents.items.length; 
            setMcqCount(totalFiles);
        } catch (error) {
            console.error("Error counting files in storage:", error);
        }
        
        try {
            const categoryCounts = collection(firestore, 'mcqCategory');
            const totalCategory = await getDocs(categoryCounts);
            setCatCount(totalCategory.size);
        } catch (err) {
            setCatCount(err);
        }

    }

    useLayoutEffect(() => {
        fetchCount();
    }, [])

    const cardData = [
        {
            "title": "Total MCQ's",
            "pic": tumb1,
            "data": mcqCount,
            "link": "/qsadmin/qsmcq",
            "icon": <SiDatabricks />,
        },
        {
            "title": "Total Users",
            "pic": tumb2,
            "data": usersCount,
            "link": "/qsadmin/qsusers",
            "icon": <LiaUsersSolid />
        },
        {
            "title": "Total Categories",
            "pic": tumb3,
            "data": catCount,
            "link": "/qsadmin/qsmcq",
            "icon": <MdOutlineCategory />
        }
    ]


    return (
        <div className='w-full items-center md:w-11/12 flex flex-col gap-8 lg:flex-row lg:justify-between'>
            {
                cardData.map((card, index) => {
                    return (
                        <div key={index} className='md:w-96 mb-8 min-[320px]:w-72 xl:w-80 lg:w-60 2xl:w-96 h-40 px-8 py-4 flex flex-col justify-around border border-outlg shadow-[0_1px_8px_2px] shadow-shadbg duration-300 hover:shadow-none rounded-md'>
                            <div className='w-full flex justify-around items-center text-3xl '>
                                {usersCount ? <p className='text-textsec'>{card.data}</p> : <p className='animate-spin text-primary'><TbLoader3 /></p>}
                                <p className='bg-outlg text-bluedk rounded-full p-2'>{card.icon}</p>
                            </div>
                            <div className='flex justify-around items-center text-xl'>
                                <Link to={card.link}><p className='text-textlg'>{card.title}</p></Link>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default AdminCard