import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "./firebase/firebaseConfig";

/**
 * Delete a document from Firestore.
 * @param {string} fileId - The ID of the Firestore document to delete.
 * @param {string} collectionName - The name of the Firestore collection.
 * @param {function} setUploadedFiles - Function to update the uploaded files state.
 */
export const deleteDatas = async (fileId, collectionName, setUploadedFiles) => {
    const docRef = doc(db, collectionName, fileId);
  
    try {
      if (!fileId || !collectionName) {
       toast.info("Please provide valid data to delete.");
       return;
     }
     console.log(`Attempting to delete document from ${collectionName} with ID:`, fileId);
     const docSnap = await getDoc(docRef);
     console.log(docSnap);
     console.log(docRef);
     
     if (!docSnap.exists()) {
       console.error("Document not found in Firestore:", fileId);
       toast.error(`Document not found. Please check the ID:${fileId}`);
       return;
     }
      await deleteDoc(docRef);
      toast.success(`Deleted successfully!`);
      setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
    } catch (error) {
      console.error("Error deleting document from Firestore:", error);
    }
  };
    
 