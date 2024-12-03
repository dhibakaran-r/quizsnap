import { collection, doc, writeBatch } from "firebase/firestore";
import { db, storage } from "./firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";

/**
 * Generic function to upload files to Firebase Storage and save metadata in Firestore.
 * @param {Array<File>} filesToUpload - List of files to upload.
 * @param {string} storagePath - Path in Firebase Storage where files will be saved.
 * @param {string} collectionName - Firestore collection name for metadata storage.
 * @param {Object} additionalMetadata - Additional metadata to store with each file.
 * @param {function} updateUploadedFiles - State updater for the uploaded files list.
 * @param {function} updateProgress - State updater for upload progress.
 */
export const uploadDatas = async ({
    filesToUpload,
    storagePath,
    collectionName,
    additionalMetadata = {},
    updateUploadedFiles,
    updateProgress,
  }) => {
    if (!filesToUpload || filesToUpload.length === 0) {
      toast.info("Please select files to upload!");
      return;
    }
  
    const batch = writeBatch(db); // Initialize a Firestore batch operation
    const updatedFiles = [];
    let totalProgress = 0;
  
    for (const file of filesToUpload) {
      try {
        const storageRef = ref(storage, `${storagePath}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        // Monitor upload progress
        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              totalProgress += progress / filesToUpload.length; // Average progress across all files
              updateProgress((prev) => ({
                ...prev,
                [file.name]: totalProgress,
              }));
            },
            (error) => {
              console.error(`Upload failed for ${file.name}:`, error);
              reject(error);
            },
            resolve // Resolve the promise when upload completes
          );
        });
  
        // Get the download URL and prepare the Firestore document
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const docRef = doc(collection(db, collectionName)); // Generate a new document reference
        const metadata = {
          name: file.name,
          url: downloadURL,
          uploadedAt: new Date(),
          ...additionalMetadata,
        };
  
        batch.set(docRef, metadata);
  
        updatedFiles.push({
          id: docRef.id,
          ...metadata,
        });
      } catch (error) {
        console.error(`Failed to upload ${file.name}:`, error);
        toast.error(`Failed to upload ${file.name}. Please try again.`);
      }
    }
  
    // Commit the batch operation
    try {
      await batch.commit();
      updateUploadedFiles((prev) => [...prev, ...updatedFiles]);
      toast.success("Files uploaded successfully!");
    } catch (error) {
      console.error("Error committing batch:", error);
      toast.error("An error occurred while saving file metadata.");
    }
  };
  