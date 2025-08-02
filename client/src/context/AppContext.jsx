import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [credentials, setCredentials] = useState([]);

  const getAuthStatus = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/auth/is-auth");
      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
      } else {
        setIsLoggedIn(false);
        setUserData("");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setIsLoggedIn(false);
        setUserData("");
      } else {
        toast.error(error.response?.data?.message || error.message || "An error occurred.");
      }
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/user/data");
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "An error occurred."
      );
    }
  };

  const fetchCredentials = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/credentials", { withCredentials: true });
      if (data.success) {
        setCredentials(data.credentials);
      } else {
        toast.error(data.message || "Failed to fetch credentials");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "An error occurred.");
    }
  };

  const addCredential = async (credential) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/credentials",
        credential,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        setCredentials((prev) => [data.credential, ...prev]);
        toast.success("Credential saved");
        return true;
      } else {
        toast.error(data.message || "Failed to save credential");
        return false;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "An error occurred.");
      return false;
    }
  };

  const editCredential = async (id, updates) => {
    try {
      const { data } = await axios.put(
        backendUrl + `/credentials/${id}`,
        updates,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        setCredentials((prev) => prev.map(c => c._id === id ? data.credential : c));
        toast.success("Credential updated");
        return true;
      } else {
        toast.error(data.message || "Failed to update credential");
        return false;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "An error occurred.");
      return false;
    }
  };

  const deleteCredential = async (id) => {
    try {
      const { data } = await axios.delete(
        backendUrl + `/credentials/${id}`,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        setCredentials((prev) => prev.filter(c => c._id !== id));
        toast.success("Credential deleted");
        return true;
      } else {
        toast.error(data.message || "Failed to delete credential");
        return false;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "An error occurred.");
      return false;
    }
  };

  const searchCredentials = async (query) => {
    try {
      const { data } = await axios.get(
        backendUrl + `/credentials/search?query=${encodeURIComponent(query)}`,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        setCredentials(data.credentials);
        return true;
      } else {
        toast.error(data.message || "Failed to search credentials");
        return false;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "An error occurred.");
      return false;
    }
  };

  useEffect(() => {
    getAuthStatus();
  }, []);

  useEffect(() => {
    if (isLoggedIn) fetchCredentials();
  }, [isLoggedIn]);

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
    credentials,
    fetchCredentials,
    addCredential,
    editCredential,
    deleteCredential,
    searchCredentials,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
