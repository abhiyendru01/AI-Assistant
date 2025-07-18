// src/context/UserContext.jsx
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

// Create context
export const userDataContext = createContext();

function UserContextProvider({ children }) {
  // Set your production backend URL
  const serverUrl = "https://ai-assistant-uuve.onrender.com";

  // Global states
  const [userData, setUserData] = useState(null);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch current logged-in user
  const handleCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true, // include credentials for session or auth cookie
      });
      setUserData(result.data);
      console.log("User Data:", result.data);
    } catch (error) {
      console.error("Fetching current user failed:", error?.response?.data || error.message);
    }
  };

  // Send voice command to Gemini backend
  const getGeminiResponse = async (command) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/user/asktoassistant`,
        { command },
        { withCredentials: true }
      );
      return result.data;
    } catch (error) {
      console.error("Gemini response error:", error?.response?.data || error.message);
      return { response: "Sorry, I couldn't understand that." };
    }
  };

  useEffect(() => {
    handleCurrentUser();
  }, []);

  const value = {
    serverUrl,
    userData,
    setUserData,
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage,
    getGeminiResponse,
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContextProvider;
