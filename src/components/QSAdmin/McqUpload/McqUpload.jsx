import React, { useState, useEffect, useRef } from "react";
import levels from '../../../service/Levels.json';
import { collection } from "firebase/firestore";
import { db } from "../../../service/firebase/firebaseConfig";
import { ToastContainer } from 'react-toastify';
import { BsFiletypeJson } from "react-icons/bs";
import { MdOutlineCloudUpload, MdOutlineDeleteOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Helmet } from 'react-helmet-async';
import AddCategory from "../../AddCategory";
import { fetchData } from "../../../service/fetchData";
import { uploadDatas } from "../../../service/uploadDatas";
import { updateData } from "../../../service/updateData";
import { deleteFile } from "../../../service/deleteFile";
import { deleteDatas } from "../../../service/deleteDatas";
import { TbLoader3 } from "react-icons/tb";
import McqFiles from "../../McqFiles";


function McqUpload() {
  const [dragging, setDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [invalidFiles, setInvalidFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  // const [uploadProgress, setUploadProgress] = useState({});
  const [bgBlur, setBlur] = useState(false);
  const [delData, setDelData] = useState({ fileID: '', fileName: '' });
  const [deletePopup, setDeletePopup] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [load, setLoad] = useState(true);

  // search filter operation

  const searchText = useSelector((state) => state.search.search)
  //  console.log("search"+searchText);

  let filterDatas = [...uploadedFiles];

  if (searchText) {
    filterDatas = uploadedFiles.filter((files) => {
      if (files.name.toLowerCase().includes(searchText) || files.category.toLowerCase().includes(searchText) || files.level.toLowerCase().includes(searchText)) {
        return files;
      }
    })
  }

  // Validate and add files
  const validateFiles = (files) => {
    const validFiles = [];
    const invalidFilesList = [];

    files.forEach((file) => {
      if (file.type === "application/json") {
        validFiles.push(file);
      } else {
        invalidFilesList.push(file.name);
      }
    });

    setSelectedFiles((prev) => [...prev, ...validFiles]);
    setInvalidFiles((prev) => [...prev, ...invalidFilesList]);
  };

  const fileInputRef = useRef();
  const categoryRef = collection(db, "mcqCategory");
  const filesCollectionRef = collection(db, "mcqFiles");

  const fetchUploadedFiles = () => {
    const files = fetchData(filesCollectionRef, setUploadedFiles);
    return () => files()
  }
  const fetchCategories = () => {
    const cats = fetchData(categoryRef, setAllCategories);
    return () => cats()
  };
  // Fetch uploaded files from Firestore

  useEffect(() => {
    fetchUploadedFiles();
    fetchCategories();
    setLoad(false);
  },[]);

  // select setCategory & level
  const setCategory = (value) => {
    setSelectedCategory(value);
  }

  const setLevel = (value) => {
    setSelectedLevel(value);
  }

  // Handle file drop
  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);

    const files = Array.from(event.dataTransfer.files);
    validateFiles(files);
  };

  // Handle file selection
  const handleFileSelection = (event) => {
    const files = Array.from(event.target.files);
    validateFiles(files);
  };

  // Upload files to Firebase Storage and Firestore

  const goUploadFiles = () => {
    setLoad(true);
    uploadFiles();
  }
  const uploadFiles = async () => {
    await uploadDatas({
      filesToUpload: selectedFiles,
      storagePath: "mcqFiles", // Folder in Firebase Storage
      collectionName: "mcqFiles", // Firestore collection name
      additionalMetadata: {
        category: selectedCategory, // Example: additional data from state
        level: selectedLevel,
      },
      updateUploadedFiles: setUploadedFiles, // Function to update uploaded files state
      // updateProgress: setUploadProgress, // Function to track upload progress
    });
    
    // Clear selected files after successful upload
    setSelectedFiles([]);
    setLoad(false);
  };


  // Update a file in Firebase Storage
  const updateFile = async (fileId, fileName) => {
    await updateData({
      collectionName: "mcqFiles", // Firestore collection
      fileId: fileId,            // Document ID
      fileName: fileName,        // File name in storage
      selectedFiles: selectedFiles, // Array of files selected for upload
      updateUploadedFiles: setUploadedFiles, // State updater function
    });
    setSelectedFiles([]);
  };

  const showDeletePopup = (fileID, fileName) => {
    setDeletePopup(true);
    // setEditPopup(false);
    setBlur(!bgBlur);
    setDelData({ fileID, fileName });
  };

  const closePopup = () => {
    // setEditPopup(false);
    setDeletePopup(false);
    setBlur(false);
    setDelData('')
  };

  const clearAll = () =>{
    setInvalidFiles([]);
    setSelectedFiles([]);
    setSelectedCategory('');
    setSelectedLevel('');
  }

  // Delete a file from Firebase Storage and Firestore

  const deleteFiles = async (fileId, fileName) => {
    await deleteFile(fileName, 'mcqFiles');  // Delete the file from Firebase Storage
    await deleteDatas(fileId, 'mcqFiles', setUploadedFiles);  // Delete the document from Firestore
    setDeletePopup(false);
  };

  return (
    <div className="w-full flex flex-col items-center gap-24">
      <Helmet><title>QuizSnap MCQ Management</title></Helmet>

      <div className="flex flex-col w-full gap-12 p-4 shadow-shadbg shadow-lg">
        <div className="flex flex-col md:flex-row w-full justify-center items-center gap-6 xl:gap-12">
          <div
            className={`w-full md:w-1/2 h-96 flex flex-col items-center justify-evenly border border-dashed rounded-lg ${dragging ? "bg-stgray" : "bg-secbr"} cursor-pointer duration-75`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              onChange={handleFileSelection}
              className="hidden"
            />
            <BsFiletypeJson className="text-[5rem]" />
            <div className="upbox">
              <h3 className="head">Selected Files</h3>
              {
                invalidFiles.length > 0 ? <>{
                  <ul className="list">
                    {
                      invalidFiles.map((iv, i) => {
                        return (
                          <li key={i} className="text-redbg">{`${iv} Not a JSON file`}</li>
                        )
                      })
                    }
                  </ul>
                }</> : <>

                  {selectedFiles.length > 0 ? (
                    <ul className="list">
                      {selectedFiles.map((file, index) => (
                        <li key={index}>
                          {file.name} ({(file.size / 1024).toFixed(2)} KB)
                        </li>
                      ))}
                      <li>category: {selectedCategory}</li>
                      <li>level: {selectedLevel}</li>
                    </ul>
                  ) : (
                    <p className="list">No valid JSON files selected</p>
                  )}

                </>
              }
              <div className="flex justify-center items-center mt-2 border border-lggray rounded-sm text-primlight" onClick={() => clearAll()}><button>Clear</button></div>
            </div>
            <p className="m-4">Drag and drop JSON files here or click to select files</p>
          </div>

          <div className="w-full md:w-1/2 h-96 flex flex-col justify-center gap-8 upbox">

            <div className="flex flex-col justify-center items-center gap-8">
              <h1 className="text-2xl text-bluetext text-center">Select Category & Level</h1>
              <div className="flex flex-col justify-center items-center gap-4">
                <select onChange={(e) => { setCategory(e.target.value) }} id="cats" class="block w-60 md:w-80 xl:w-[30rem] px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>Choose a category</option>
                  {
                    allCategories.map((cat, i) => {
                      return (
                        <option key={i} value={cat.category}>{cat.category}</option>
                      )
                    })
                  }
                </select>
                <select onChange={(e) => { setLevel(e.target.value) }} id="levels" class="block w-60 md:w-80 xl:w-[30rem] px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>Choose a level</option>
                  {
                    levels.map((level, i) => {
                      return (
                        <option key={i} value={level.level}>{level.level}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>

          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          {load ?   <button className="w-full xl:w-3/5 px-12 md:px-60 py-2 flex justify-center items-center gap-2 bg-secondary text-bluebg border rounded-md duration-200 hover:text-primary hover:bg-bluebg hover:border-primary">
            <TbLoader3 className='animate-spin text-xl' /> Uploaing...
          </button> 
          : <button className="w-full xl:w-3/5 px-12 md:px-60 py-2 flex justify-center items-center gap-2 bg-secondary text-bluebg border rounded-md duration-200 hover:text-primary hover:bg-bluebg hover:border-primary"
            onClick={goUploadFiles}
          >
            <MdOutlineCloudUpload size={30} /> Upload Files
          </button> }
        

        </div>
        <div className="flex items-center flex-col gap-8">
          <AddCategory allCategories={allCategories} />
        </div>

      </div>

      <div className="w-full flex flex-col p-8 gap-8 shadow-shadbg shadow-2xl">
      {load ? <div className='w-full h-96 flex justify-center items-center text-primary text-3xl'>Loading Data <TbLoader3 className='animate-spin' /></div> : <>
        <McqFiles filterDatas={filterDatas} update={updateFile} deletePop={showDeletePopup} />
        </>}
      </div>
      {deletePopup && (
        <div className="popup-card fixed top-48  w-[40rem] h-[20rem] flex flex-col justify-around items-center">
          <div className="w-11/12 flex justify-between items-center">
            <p className='text-xl font-bold'>Delete MCQ File</p>
            <p className="bg-redbg rounded-full p-1 cursor-pointer" onClick={closePopup}>
              <RxCross2 />
            </p>
          </div>

          <div className="w-full flex flex-col justify-center items-center gap-4">
            <p id='ID' className='font-semibold'>File ID: {delData.fileID}</p>
            <p className='text-xl font-bold'>Are You sure, you want to delete this file <span className="text-textsec font-bold">{delData.fileName}</span>!</p>
            <button className="px-4 py-2 flex justify-center items-center gap-2 border bg-redbg text-bluebg rounded-md duration-200 hover:text-redbg hover:bg-bluebg hover:border-redbg" onClick={() => deleteFiles(delData.fileID, delData.fileName)}><span><MdOutlineDeleteOutline /></span><span>Delete</span></button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default McqUpload;
