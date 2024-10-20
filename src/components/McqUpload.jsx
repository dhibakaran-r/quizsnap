// src/components/AdminUpload.js
import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../service/firebase/firebaseConfig";
// import { storage } from "../firebase"; // Make sure to import your firebase config

const McqUpload = () => {
  const [file, setFile] = useState(null); // State to store the selected file
  const [statusMessage, setStatusMessage] = useState(""); // State for status updates

  // Handle the file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle the upload logic
  const handleUpload = (e) => {
    e.preventDefault();

    if (!file) {
      setStatusMessage("Please select a JSON file to upload.");
      return;
    }

    // Check file extension to make sure it's JSON
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (fileExtension !== "json") {
      setStatusMessage("Only .json files are allowed.");
      return;
    }

    // Create a reference to Firebase Storage
    const storageRef = ref(storage, `questions/${file.name}`); // Folder is called 'questions'

    // Upload the file
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Track the progress of the upload
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setStatusMessage(`Upload is ${progress}% done.`);
      },
      (error) => {
        // Handle unsuccessful uploads
        setStatusMessage(`Error during upload: ${error.message}`);
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setStatusMessage(`File uploaded successfully! Download URL: ${downloadURL}`);
        });
      }
    );
  };

  return (
    <div className="upload-container">
      <h2>Upload Quiz JSON File</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept=".json" onChange={handleFileChange} />
        <button type="submit">Upload File</button>
      </form>
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default McqUpload;
