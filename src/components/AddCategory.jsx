import { addDoc, collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../service/firebase/firebaseConfig';
import { toast, ToastContainer } from 'react-toastify';
import { FiPlus } from 'react-icons/fi';

function AddCategory() {

    const [categoryDetails, setCategoryDetails] = useState({categoryName: '', basicDesc: '', interDesc: '', advDesc: ''});
    const categoryRef = collection(db, "mcqCategory");

    const newCategory = (e) => {
        setCategoryDetails({...categoryDetails, [e.target.name]: e.target.value })
    }
    

    const addCategory = async (categoryDetails) => {

        try{
            await addDoc(categoryRef, {
                id: categoryDetails.categoryName,
                category: categoryDetails.categoryName,
                basicDesc: categoryDetails.basicDesc,
                interDesc: categoryDetails.interDesc,
                advDesc: categoryDetails.advDesc,
                addDT: new Date()
            });
            setCategoryDetails({categoryName: '', basicDesc: '', interDesc: '', advDesc: ''});
        } catch(error){
            console.error(error);
        }
        toast.success('Category Added Successfully!', {containerId:'catup'});

    }

    return (
        <>
            <h1 htmlFor="addcat" className="text-2xl text-bluetext text-center">Add Category</h1>
            <div className="w-3/4 flex flex-col gap-8">
                <label htmlFor='addcat'>Enter Category</label>
                <input type="text" placeholder="Enter a Category" name='categoryName' id="addcat" onChange={newCategory} value={categoryDetails.categoryName} className=" px-6 py-3 text-xl border outline-none rounded-md" />
                
                <label htmlFor='addBasic'>Basic Level Description</label>
                <textarea placeholder="Enter a Description" name='basicDesc' id="addBasic"  onChange={newCategory} value={categoryDetails.basicDesc} className=" px-6 py-3 text-xl border outline-none rounded-md" />
                
                <label htmlFor='addInter'>Intermediate Level Description</label>
                <textarea placeholder="Enter a Description" name='interDesc' id="addInter"  onChange={newCategory} value={categoryDetails.interDesc} className=" px-6 py-3 text-xl border outline-none rounded-md" />
                
                <label htmlFor='addAdv'>Advanced Level Description</label>
                <textarea placeholder="Enter a Description" name='advDesc' id="addAdv"  onChange={newCategory} value={categoryDetails.advDesc} className=" px-6 py-3 text-xl border outline-none rounded-md" />
                
                <div className='w-full flex justify-center items-center mb-20'>
                <button className="w-1/2 flex gap-2 justify-center items-center px-4 py-2 text-sm bg-bluedk text-bluebg border border-bluedk duration-200 hover:bg-bluebg hover:text-bluedk rounded"
                    onClick={() => addCategory(categoryDetails)}
                >
                    <FiPlus size={20} /> Add</button>
                </div>
            <ToastContainer containerId={'catup'} />
            </div>
        </>
    )
}

export default AddCategory