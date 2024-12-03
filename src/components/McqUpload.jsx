import React, { useState, useEffect, useRef } from "react";
import levels from '../service/Levels.json'
import { ref, uploadBytesResumable, deleteObject, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, writeBatch } from "firebase/firestore";
import { db, storage } from "../service/firebase/firebaseConfig";
import { ToastContainer, toast } from 'react-toastify';
import { BsFiletypeJson } from "react-icons/bs";
import { MdOutlineCloudUpload, MdOutlineDelete, MdOutlineDeleteOutline } from "react-icons/md";
import { LuFileJson2 } from "react-icons/lu";
import { GrDocumentUpdate } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
import { PiPlus } from "react-icons/pi";
import { FiPlus } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Helmet } from 'react-helmet-async';
import AddCategory from "./AddCategory";
import { fetchData } from "../service/fetchData";
import { uploadDatas } from "../service/uploadDatas";
import { updateData } from "../service/updateData";
import { deleteFile } from "../service/deleteFile";
import { deleteDatas } from "../service/deleteDatas";


function McqUpload() {
  const [dragging, setDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [bgBlur, setBlur] = useState(false);
  const [delData, setDelData] = useState({ fileID: '', fileName: '' });
  const [deletePopup, setDeletePopup] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');


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

  const fileInputRef = useRef();
  const categoryRef = collection(db, "mcqCategory");
  const filesCollectionRef = collection(db, "mcqFiles");

  const fetchUploadedFiles = async () => {
    await fetchData(filesCollectionRef, setUploadedFiles);
  }
  const fetchCategories = async () => {
    await fetchData(categoryRef, setAllCategories);
  };
  // Fetch uploaded files from Firestore

  useEffect(() => {
    fetchUploadedFiles();
    fetchCategories();

  }, [uploadedFiles, allCategories]);

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

    const files = Array.from(event.dataTransfer.files);;
  };

  // Handle file selection
  const handleFileSelection = (event) => {
    const files = Array.from(event.target.files);
  };

  // Upload files to Firebase Storage and Firestore

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
      updateProgress: setUploadProgress, // Function to track upload progress
    });

    // Clear selected files after successful upload
    setSelectedFiles([]);
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


  // Delete a file from Firebase Storage and Firestore

  const deleteFiles = async(fileId, fileName) => {
    await deleteFile(fileName, 'mcqFiles');  // Delete the file from Firebase Storage
    await deleteDatas(fileId, 'mcqFiles', setUploadedFiles);  // Delete the document from Firestore
    setDeletePopup(false);
  };

  return (
    <div className="w-full flex flex-col items-center gap-24">
      <Helmet><title>QuizSnap MCQ Management</title></Helmet>

      <div className="flex flex-col w-full  gap-12 p-4 shadow-shadbg shadow-lg">
        <div className="flex w-full justify-center items-center gap-12">
          <div
            className={`w-1/2 h-96 flex flex-col items-center justify-evenly border border-dashed rounded-lg ${dragging ? "bg-stgray" : "bg-secbr"} cursor-pointer duration-75`}
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
            <BsFiletypeJson size={100} />
            <div className="upbox">
              <h3 className="head">Selected Files</h3>
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
            </div>
            <p>Drag and drop JSON files here or click to select files</p>
          </div>

          <div className="w-1/2 h-96 flex flex-col justify-center gap-8 upbox">

            <div className="flex flex-col justify-center items-center gap-8">
              <h1 className="text-2xl text-bluetext text-center">Select Category & Level</h1>
              <div className="flex flex-col justify-center items-center gap-4">
                <select onChange={(e) => { setCategory(e.target.value) }} id="cats" class="block w-[30rem] px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>Choose a category</option>
                  {
                    allCategories.map((cat, i) => {
                      return (
                        <option key={i} value={cat.category}>{cat.category}</option>
                      )
                    })
                  }
                </select>
                <select onChange={(e) => { setLevel(e.target.value) }} id="levels" class="block w-[30rem] px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
          <button className="w-1/2 px-60 py-2 flex justify-center items-center gap-2 bg-secondary text-bluebg border rounded-md duration-200 hover:text-primary hover:bg-bluebg hover:border-primary"
            onClick={uploadFiles}
          >
            <MdOutlineCloudUpload size={30} /> Upload Files
          </button>
        </div>
        <div className="flex items-center flex-col gap-8">
          <AddCategory allCategories={allCategories} />
        </div>

      </div>
      <div className="w-4/5 flex flex-col p-8 gap-8 border border-primlight rounded-lg">
        <h1 className="text-2xl">Uploaded MCQ Files</h1>
        <ul className=" mx-16 p-0 text-secgray">
          {filterDatas.map((file) => (
            <li key={file.id} className="my-4 flex justify-between items-center">
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row gap-2 items-center"
              >
                <LuFileJson2 className="text-bluelg" /> {file.name}
              </a>
              <span>Category: {file.category}</span>
              <span>Level: {file.level}</span>
              <div className="flex w-56 lg:w-64 xl:w-56 justify-between">
                <button
                  onClick={() => updateFile(file.id, file.name)}
                  className="flex gap-2 justify-center items-center px-4 py-2 text-sm bg-secondary text-bluebg border border-secondary duration-200 hover:bg-bluebg hover:text-secondary rounded"
                >
                  <GrDocumentUpdate />  Update
                </button>
                <button
                  onClick={() => showDeletePopup(file.id, file.name)}
                  className="flex gap-2 justify-center items-center px-4 py-2 text-sm bg-redbg text-bluebg border border-redbg duration-200 hover:bg-bluebg hover:text-redbg rounded"
                >
                  <MdOutlineDelete size={20} /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
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
