import { addDoc, collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../service/firebase/firebaseConfig';
import { toast, ToastContainer } from 'react-toastify';
import { FiPlus } from 'react-icons/fi';
import { deleteDatas } from '../service/deleteDatas';
import { fetchData } from '../service/fetchData';

function AddCategory() {

    const [activeLink, setActiveLink] = useState('Add Category');
    const [categoryDetails, setCategoryDetails] = useState({ categoryName: '', basicDesc: '', interDesc: '', advDesc: '' });
    const [allCategories, setAllCategories] = useState([]);

    const categoryRef = collection(db, "mcqCategory");

    const fetchCategory = async () => {
        await fetchData(categoryRef, setAllCategories);
      };
    
      useEffect(() =>{
        fetchCategory();
      },[])

    const setActive = (id) => {
        setActiveLink(id);
    }

    const newCategory = (e) => {
        setCategoryDetails({ ...categoryDetails, [e.target.name]: e.target.value })
    }


    const addCategory = async (categoryDetails) => {

        try {
            await addDoc(categoryRef, {
                id: categoryDetails.categoryName,
                category: categoryDetails.categoryName,
                basicDesc: categoryDetails.basicDesc,
                interDesc: categoryDetails.interDesc,
                advDesc: categoryDetails.advDesc,
                addDT: new Date()
            });
            setCategoryDetails({ categoryName: '', basicDesc: '', interDesc: '', advDesc: '' });
        } catch (error) {
            console.error(error);
        }
        toast.success('Category Added Successfully!', { containerId: 'catup' });

    }

    const deleteCategory = async (id) => {

        await deleteDatas(id, 'mcqCategory', setAllCategories)

    };

    return (
        <>
            <div className="flex justify-center items-center gap-4 text-2xl text-bluetext text-center">
                <a 
                onClick={() => setActive('Add Category')} 
                className={`cursor-pointer pr-4 border-r border-r-bluetext ${activeLink === 'Add Category' ? 'text-primary' : ''}`}
                >Add Category</a>
                <a 
                onClick={() => setActive('Delete Category')} 
                className={`cursor-pointer ${activeLink === 'Delete Category' ? 'text-primary' : ''}`} 
                >Delete Category</a>
            </div>
            <div className="w-3/4 flex flex-col gap-8">
                {
                    activeLink === 'Add Category' ? <>

                        <label htmlFor='addcat'>Enter Category</label>
                        <input type="text" placeholder="Enter a Category" name='categoryName' id="addcat" onChange={newCategory} value={categoryDetails.categoryName} className=" px-6 py-3 text-xl border outline-none rounded-md" />

                        <label htmlFor='addBasic'>Basic Level Description</label>
                        <textarea placeholder="Enter a Description" name='basicDesc' id="addBasic" onChange={newCategory} value={categoryDetails.basicDesc} className=" px-6 py-3 text-xl border outline-none rounded-md" />

                        <label htmlFor='addInter'>Intermediate Level Description</label>
                        <textarea placeholder="Enter a Description" name='interDesc' id="addInter" onChange={newCategory} value={categoryDetails.interDesc} className=" px-6 py-3 text-xl border outline-none rounded-md" />

                        <label htmlFor='addAdv'>Advanced Level Description</label>
                        <textarea placeholder="Enter a Description" name='advDesc' id="addAdv" onChange={newCategory} value={categoryDetails.advDesc} className=" px-6 py-3 text-xl border outline-none rounded-md" />

                        <div className='w-full flex justify-center items-center mb-20'>
                            <button className="w-1/2 flex gap-2 justify-center items-center px-4 py-2 text-sm bg-bluedk text-bluebg border border-bluedk duration-200 hover:bg-bluebg hover:text-bluedk rounded"
                                onClick={() => addCategory(categoryDetails)}
                            >
                                <FiPlus size={20} /> Add</button>
                        </div>
                    </> : <>
                        <select id="cats" class="block w-[30rem] px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Choose a category</option>
                            {
                                allCategories.map((cat, i) => {
                                    return (
                                        <option key={i} value={cat.category}>{cat.category}</option>
                                    )
                                })
                            }
                        </select>
                        {/* <label htmlFor='delcat'>Enter Category</label>
                        <input type="text" placeholder="Enter a Category" name='categoryName' id="delcat"
                            onChange={delCategory} value={deleteCatName} className=" px-6 py-3 text-xl border outline-none rounded-md" /> */}
                        <div className='flex flex-col gap-4'>
                            {
                                allCategories.map((c, i) => {return(
                                    <div className='w-96 flex justify-between gap-4'>
                                        <h1 key={i}>{c.category}</h1>

                                        <button className="flex gap-2 justify-center items-center px-4 py-2 text-sm bg-bluedk text-bluebg border border-bluedk duration-200 hover:bg-bluebg hover:text-bluedk rounded"
                                            onClick={() => deleteCategory(c.id)}
                                         //  disabled={categoryName !== deleteCatName}
                                        >
                                            <FiPlus size={20} /> Delete {c.id}</button>
                                    </div>
                                )})
                            }
                        </div> 
                        <div className='w-full flex justify-center items-center mb-20'>
                        </div>

                    </>
                } 
                <ToastContainer containerId={'catup'} />
            </div>
        </>
    )
}

export default AddCategory