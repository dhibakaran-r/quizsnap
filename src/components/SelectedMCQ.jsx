import React, { useEffect, useState } from "react";
import axios from "axios";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../service/firebase/firebaseConfig";
// import { storage } from "./firebase"; // Import Firebase storage configuration

const DisplayJSONWithAxios = () => {
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJsonFile = async () => {
      try {
        // Create a reference to the JSON file in Firebase Storage
        const fileRef = ref(storage, "questions/HTMLBasic.json");

        // Get the download URL
        const fileURL = await getDownloadURL(fileRef);

        // Use Axios to fetch the JSON file
        const response = await axios.get(fileURL);

        // Set the fetched data to state
        setJsonData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching JSON file: ", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchJsonFile();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  return (
    <div>
      <h2>JSON Data from Firebase Storage</h2>
      <pre>{JSON.stringify(jsonData, null, 2)}</pre>
    </div>
  );
};

export default DisplayJSONWithAxios;
