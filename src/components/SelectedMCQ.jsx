import React, { useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
// import { storage } from "./firebase-config";
import { storage } from "../service/firebase/firebaseConfig";

const SelectedMCQ = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fileRef = ref(storage, "questions/HTMLBasic.json"); 
        const url = await getDownloadURL(fileRef);
        // console.log(url);
        
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);
        
        setQuestions(data);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to fetch questions. Please check the file name or upload a valid file.");
      }
    };

    fetchQuestions();
  }, []);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h2>Questions</h2>
      <ul>
          <li >
            <strong>Q:</strong> {questions.category} <br />
            <strong>A:</strong> {questions.level}
          </li>
        {questions.questions.map((q, index) => {return(

          <li>{q.question}</li>
        )
        })} 
      </ul>
    </div>
  );
};

export default SelectedMCQ;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ref, getDownloadURL } from "firebase/storage";
// import { storage } from "../service/firebase/firebaseConfig";

// const DisplayJSONWithAxios = () => {
//   const [jsonData, setJsonData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchJsonFile = async () => {
//       try {
        
//         const fileRef = ref(storage, "questions/HTMLBasic.json");

     
//         const fileURL = await getDownloadURL(fileRef);

        
//         const response = await axios.get(fileURL);

        
//         setJsonData(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching JSON file: ", err);
//         setError(err);
//         setLoading(false);
//       }
//     };

//     fetchJsonFile();
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error fetching data: {error.message}</p>;
//   }

//   return (
//     <div>
//       <h2>JSON Data from Firebase Storage</h2>
//       <pre>{JSON.stringify(jsonData, null, 2)}</pre>
//     </div>
//   );
// };

// export default DisplayJSONWithAxios;
