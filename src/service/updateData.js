import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db, storage } from "./firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

/**
 * Generic function to update a file in Firebase Storage and Firestore.
 * @param {string} collectionName - Name of the Firestore collection.
 * @param {string} fileId - ID of the document in Firestore.
 * @param {string} fileName - Name of the file in Firebase Storage.
 * @param {File[]} selectedFiles - Array of files selected for upload.
 * @param {function} updateUploadedFiles - State updater function for uploaded files.
 */
export const updateData = async ({
    collectionName,
    fileId,
    fileName,
    selectedFiles,
    updateUploadedFiles,
  }) => {
    const fileToUpdate = selectedFiles[0]; // Use the first file for the update
  
    if (!fileToUpdate) {
      toast.info("Please select a file to update!");
      return;
    }
  
    const storageRef = ref(storage, `${collectionName}/${fileName}`);
  
    try {
      // Upload file to Firebase Storage
      const snapshot = await uploadBytesResumable(storageRef, fileToUpdate);
      const newUrl = await getDownloadURL(snapshot.ref);
  
      // Update Firestore document with the new file URL
      const docRef = doc(db, collectionName, fileId);
      await updateDoc(docRef, {
        url: newUrl,
        updatedAt: new Date(),
      });
  
      // Update local state for uploaded files
      updateUploadedFiles((prev) =>
        prev.map((file) =>
          file.id === fileId ? { ...file, url: newUrl } : file
        )
      );
  
      toast.success("File updated successfully!");
    } catch (error) {
      console.error("Error updating file:", error);
      toast.error("Failed to update the file.");
    }
  };
  