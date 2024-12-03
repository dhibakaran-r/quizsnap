import { addDoc, collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../service/firebase/firebaseConfig';
import { toast, ToastContainer } from 'react-toastify';
import { FiPlus } from 'react-icons/fi';
import { deleteDatas } from '../service/deleteDatas';
import { fetchData } from '../service/fetchData';
import { TbLoader3 } from 'react-icons/tb';
import { MdOutlineDeleteOutline } from 'react-icons/md';

function AddCategory() {

    const [load, setLoad] = useState(true);
    const [activeLink, setActiveLink] = useState('Add Category');
    const [categoryDetails, setCategoryDetails] = useState({ categoryName: '', basicDesc: '', interDesc: '', advDesc: '' });
    const [allCategories, setAllCategories] = useState([]);

    const categoryRef = collection(db, "mcqCategory");

    const fetchCategory = () => {
        const cats = fetchData(categoryRef, setAllCategories);
        return () => cats()
    };

    useEffect(() => {
        fetchCategory();
        setLoad(false);
    }, [])

    const setActive = (id) => {
        setActiveLink(id);
    }

    const newCategory = (e) => {
        setCategoryDetails({ ...categoryDetails, [e.target.name]: e.target.value })
    }

    const setAddCategory = (categoryDetails) => {
        setLoad(true);
        addCategory(categoryDetails);
    }

    const addCategory = async (categoryDetails) => {

        try {
            await addDoc(categoryRef, {
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
        setLoad(false);
    }


    const setDeleteCategory = async (id) => {
        setLoad(true);
        deleteCategory(id);
    }

    const deleteCategory = async (id) => {

        await deleteDatas(id, 'mcqCategory', setAllCategories)
        setLoad(false);

    };

    return (
        <div className='w-full flex flex-col justify-center items-center gap-8 mb-8'>
            <div className="flex p-4 justify-center items-center gap-4 text-2xl text-bluetext text-center border border-primlight rounded-full">
                <a
                    onClick={() => setActive('Add Category')}
                    className={`cursor-pointer pr-4 border-r border-r-bluetext ${activeLink === 'Add Category' ? 'text-primary' : ''}`}
                >Add Category</a>
                <a
                    onClick={() => setActive('Delete Category')}
                    className={`cursor-pointer ${activeLink === 'Delete Category' ? 'text-primary' : ''}`}
                >Delete Category</a>
            </div>
            <div className="w-3/4 p-8 flex flex-col gap-8 border border-lggray rounded-lg">
                {
                    activeLink === 'Add Category' ? <>

                        <label htmlFor='addcat' className='text-lg font-bold'>Enter Category</label>
                        <input type="text" placeholder="Enter a Category" name='categoryName' id="addcat" required onChange={newCategory} value={categoryDetails.categoryName} className="ms-4 px-6 py-3 text-xl border outline-none rounded-md" />

                        <label htmlFor='addBasic' className='text-lg font-bold'>Basic Level Description</label>
                        <textarea placeholder="Enter a Description" name='basicDesc' id="addBasic" required onChange={newCategory} value={categoryDetails.basicDesc} className="ms-4 px-6 py-3 text-xl border outline-none rounded-md" />

                        <label htmlFor='addInter' className='text-lg font-bold'>Intermediate Level Description</label>
                        <textarea placeholder="Enter a Description" name='interDesc' id="addInter" required onChange={newCategory} value={categoryDetails.interDesc} className="ms-4 px-6 py-3 text-xl border outline-none rounded-md" />

                        <label htmlFor='addAdv' className='text-lg font-bold'>Advanced Level Description</label>
                        <textarea placeholder="Enter a Description" name='advDesc' id="addAdv" required onChange={newCategory} value={categoryDetails.advDesc} className="ms-4 px-6 py-3 text-xl border outline-none rounded-md" />

                        <div className='w-full flex justify-center items-center'>
                            {load ?
                                <button className="w-1/2 flex gap-2 justify-center items-center px-4 py-2 text-sm bg-bluedk text-bluebg border border-bluedk duration-200 hover:bg-bluebg hover:text-bluedk rounded">
                                    <TbLoader3 className='animate-spin' size={20} /> Adding...</button>
                                :
                                <button className="w-1/2 flex gap-2 justify-center items-center px-4 py-2 text-sm bg-bluedk text-bluebg border border-bluedk duration-200 hover:bg-bluebg hover:text-bluedk rounded"
                                    onClick={() => setAddCategory(categoryDetails)}
                                >
                                    <FiPlus size={20} /> Add</button>
                            }
                        </div>
                    </> : <>
                        <div className='flex flex-col justify-center items-center gap-4'>
                            {
                                allCategories.map((c, i) => {
                                    return (
                                        <div key={i} className='w-3/5 p-4 flex justify-between items-center gap-4 border border-lggray shadow-md rounded-sm duration-200 hover:shadow-2xl'>
                                            <p>{c.category}</p>
                                            <p>{c.addDT?.toDate().toLocaleString()}</p>

                                            <button className="flex gap-2 justify-center items-center px-4 py-2 text-sm bg-redbg text-bluebg border border-redbg duration-200 hover:bg-bluebg hover:text-redbg rounded"
                                                onClick={() => setDeleteCategory(c.id)}
                                                disabled={load === true}
                                            >
                                                <MdOutlineDeleteOutline size={20} /> Delete</button>
                                            {/* {
                                                load ? <>
                                                    <button className="flex gap-2 justify-center items-center px-4 py-2 text-sm bg-redbg text-bluebg border border-redbg duration-200 hover:bg-bluebg hover:text-redbg rounded">
                                                        <TbLoader3 className='animate-spin' size={20} /> Deleting...</button>
                                                </>
                                                    :

                                            } */}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='w-full flex justify-center items-center mb-20'>
                        </div>

                    </>
                }
                <ToastContainer containerId={'catup'} />
            </div>
        </div>
    )
}

export default AddCategory