import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { storage } from "./firebase-config";
import { storage } from "../service/firebase/firebaseConfig";

const McqUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const storageRef = ref(storage, `questions/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading file:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setDownloadURL(url);
          alert("File uploaded successfully!");
        });
      }
    );
  };

  return (
    <div>
      <h2>Upload JSON File</h2>
      <input type="file" accept=".json" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadProgress > 0 && <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>}
      {downloadURL && <p>Download URL: <a href={downloadURL} target="_blank" rel="noopener noreferrer">View File</a></p>}
    </div>
  );
};

export default McqUpload;

// import React, { useState } from "react";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { storage } from "../service/firebase/firebaseConfig";

// const McqUpload = () => {
//   const [file, setFile] = useState(null); 
//   const [statusMessage, setStatusMessage] = useState(""); 

  
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

  
//   const handleUpload = (e) => {
//     e.preventDefault();

//     if (!file) {
//       setStatusMessage("Please select a JSON file to upload.");
//       return;
//     }

   
//     const fileExtension = file.name.split('.').pop().toLowerCase();
//     if (fileExtension !== "json") {
//       setStatusMessage("Only .json files are allowed.");
//       return;
//     }

    
//     const storageRef = ref(storage, `questions/${file.name}`);

  
//     const uploadTask = uploadBytesResumable(storageRef, file);

    
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setStatusMessage(`Upload is ${progress}% done.`);
//       },
//       (error) => {
      
//         setStatusMessage(`Error during upload: ${error.message}`);
//       },
//       () => {
     
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setStatusMessage(`File uploaded successfully! Download URL: ${downloadURL}`);
//         });
//       }
//     );
//   };

//   return (
//     <div className="upload-container">
//       <h2>Upload Quiz JSON File</h2>
//       <form onSubmit={handleUpload}>
//         <input type="file" accept=".json" onChange={handleFileChange} />
//         <button type="submit">Upload File</button>
//       </form>
//       {statusMessage && <p>{statusMessage}</p>}
//     </div>
//   );
// };

// export default McqUpload;
