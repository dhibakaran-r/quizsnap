import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/firebaseConfig";

/**
 * Generic function to fetch documents from a Firestore collection.
 * @param {CollectionReference|string} collectionRef - Firestore collection reference or name.
 * @param {function} setData - State updater for storing fetched data.
 * @returns {Promise<void>}
 */
export const fetchData = async (collectionRef, setData) => {
    try {
      // Determine the collection reference
      const ref =
        typeof collectionRef === "string"
          ? collection(db, collectionRef) // Create reference from collection name
          : collectionRef; // Use provided reference
  
      // Fetch documents
      const querySnapshot = await getDocs(ref);
      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      // Update state with fetched data
      setData(documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };
  