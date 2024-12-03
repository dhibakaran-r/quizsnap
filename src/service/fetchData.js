import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase/firebaseConfig";

/**
 * Generic function to fetch documents from a Firestore collection in real-time.
 * @param {CollectionReference|string} collectionRef - Firestore collection reference or name.
 * @param {function} setData - State updater for storing fetched data.
 * @returns {function} - Unsubscribe function to stop listening for updates.
 */
export const fetchData = (collectionRef, setData) => {
  try {
    // Determine the collection reference
    const ref =
      typeof collectionRef === "string"
        ? collection(db, collectionRef) // Create reference from collection name
        : collectionRef; // Use provided reference

    // Set up a real-time listener for the collection
    const unsubscribe = onSnapshot(ref, (querySnapshot) => {
      // Extract documents from the snapshot
      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Update state with fetched data
      setData(documents);
    });

    // Return the unsubscribe function to stop listening when needed
    return unsubscribe;
  } catch (error) {
    console.error("Error fetching documents:", error);
  }
};





























// import { collection, getDocs } from "firebase/firestore";
// import { db } from "./firebase/firebaseConfig";

// /**
//  * Generic function to fetch documents from a Firestore collection.
//  * @param {CollectionReference|string} collectionRef
//  * @param {function} setData
//  * @returns {Promise<void>}
//  */
// export const fetchData = async (collectionRef, setData) => {
//     try {
      // Determine the collection reference
      // const ref =
      //   typeof collectionRef === "string"
      //     ? collection(db, collectionRef) 
      //     : collectionRef; 
      // Fetch documents
      // const querySnapshot = await getDocs(ref);
      // const documents = querySnapshot.docs.map((doc) => ({
      //   id: doc.id,
      //   ...doc.data(),
      // }));
  
      // Update state with fetched data
  //     setData(documents);
  //   } catch (error) {
  //     console.error("Error fetching documents:", error);
  //   }
  // };
  