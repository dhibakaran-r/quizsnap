import React, { useEffect, useState } from 'react'
import tumb1 from '../assets/images/totmcq.jpg'
import tumb2 from '../assets/images/totuser.jpg'
import tumb3 from '../assets/images/actmcq.jpg'
import { SiDatabricks } from "react-icons/si";
import { LiaUsersSolid } from "react-icons/lia";
import { VscLayersActive } from "react-icons/vsc";
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '../service/firebase/firebaseConfig';
import { TbLoader3 } from "react-icons/tb";
import { Link } from 'react-router-dom';

function AdminCard() {

    const [usersCount, setUsersCount] = useState(0);
    const firestore = getFirestore(app);
    const fetchCount = async () => {

        try {
            const usercollections = collection(firestore, 'users');
            const totalCounts = await getDocs(usercollections);
            setUsersCount(totalCounts.size);
        } catch (err) {
            setUsersCount(err);
        }

    }

    useEffect(() => {
        fetchCount();
    }, [])

    const cardData = [
        {
            "title": "Total MCQ's",
            "pic": tumb1,
            "data": "",
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
            "title": "Active MCQ's",
            "pic": tumb3,
            "data": "",
            "icon": <VscLayersActive />
        }
    ]


    return (
        <div className='w-full items-center md:w-11/12 flex flex-col gap-8 lg:flex-row lg:justify-between'>
            {
                cardData.map((card, index) => {
                    return (
                        <div key={index} className='w-96 mb-8 min-[320px]:w-72 xl:w-80 lg:w-60 2xl:w-96 h-40 px-8 py-4 flex flex-col justify-around border border-outlg shadow-[0_1px_8px_2px] shadow-shadbg duration-300 hover:shadow-none rounded-md'>
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