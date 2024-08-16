import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import fs from 'fs'; 

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Function to upload a file to Firebase Storage
const uploadOnFirebase = async (filePath, fileName) => {
    try {
        if (!filePath) return null;

        const fileContent = await fs.readFile(filePath);
        const storageRef = ref(storage, fileName); // Create a reference to the file in storage

        const metadata = {
            contentType: 'auto', // Automatically determine content type
        };

        // Upload the file to Firebase Storage
        const uploadResult = await uploadBytes(storageRef, fileContent, metadata);

        // Optionally, get the download URL of the uploaded file
        const downloadURL = await getDownloadURL(uploadResult.ref);

        // Remove the local file after upload
        await fs.unlink(filePath);

        // Return the download URL and other metadata if needed
        return { downloadURL, metadata: uploadResult.metadata };
    } catch (error) {
        console.error("Error uploading file to Firebase Storage:", error);
        return null;
    }
};

// Function to delete a file from Firebase Storage
const deleteOnFirebase = async (fileName) => {
    try {
        if (!fileName) return null;

        const storageRef = ref(storage, fileName); // Create a reference to the file to be deleted

        // Delete the file from Firebase Storage
        await deleteObject(storageRef);
        console.log(`File ${fileName} deleted successfully`);

        return true;
    } catch (error) {
        console.error("Error deleting file from Firebase Storage:", error);
        return null;
    }
};

// Export the functions for use in other parts of your application
export { uploadOnFirebase, deleteOnFirebase };
