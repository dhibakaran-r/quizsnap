import { deleteObject, ref } from "firebase/storage";
import { storage } from "./firebase/firebaseConfig";

/**
 * Delete a file from Firebase Storage.
 * @param {string} fileName - The name of the file in Firebase Storage to delete.
 * @param {string} collectionName - The name of the Firebase Storage collection (optional).
 */
export const deleteFile = async (fileName, collectionName) => {
    const fileRef = ref(storage, `${collectionName ? collectionName : "default"}/${fileName}`);
    
    try {
      await deleteObject(fileRef);
      console.log(`File ${fileName} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting file from Firebase Storage:", error);
    }
  };
  