import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../service/firebase/firebaseConfig';
import img1 from '../assets/images/html.png';
import img2 from '../assets/images/css.png';
import img3 from '../assets/images/javascript.png';
import img4 from '../assets/images/react.png';

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

    return (
        <div className='w-full'>

            <h1 className='text-3xl font-bold'>Explore Categories</h1>
            <div className='w-4/5 flex justify-center items-center'>
                {
                    allCategory.map((category, i) => {
                        return (
                            <div className='w-12'>
                                <img src={img1} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Explore