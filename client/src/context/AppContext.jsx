import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

export const AppContext = createContext();

const DEFAULT_CATEGORIES = [
  { name: "Important", color: "#6366f1", isDefault: true },
  { name: "Social media", color: "#f59e42", isDefault: true },
  { name: "Streaming", color: "#ef4444", isDefault: true },
  { name: "Sports", color: "#22c55e", isDefault: true },
];

export const AppContextProvider = ({ children }) => {
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [credentials, setCredentials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const isExtensionEnv = (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.id) || import.meta.env.MODE === "extension";

  const syncCredentialsToExtension = (creds) => {
    try {
      if (!isExtensionEnv) return;
      const payload = Array.isArray(creds) ? creds : credentials;
      if (!Array.isArray(payload)) return;
      chrome.runtime.sendMessage({ type: 'SYNC_CREDENTIALS', credentials: payload });
    } catch (_) {
    }
  };

  const getAuthStatus = async () => {
    try {
      setIsAuthenticating(true);
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
    } finally {
      setIsAuthenticating(false);
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
        syncCredentialsToExtension(data.credentials);
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
        syncCredentialsToExtension([data.credential, ...credentials]);
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
        const next = credentials.map(c => c._id === id ? data.credential : c);
        syncCredentialsToExtension(next);
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
        const next = credentials.filter(c => c._id !== id);
        syncCredentialsToExtension(next);
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

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/categories", { withCredentials: true });
      if (data.success) {
        const merged = [
          ...DEFAULT_CATEGORIES.filter(
            def => !data.categories.some(cat => cat.name === def.name)
          ),
          ...data.categories
        ];
        setCategories(merged);
      } else {
        toast.error(data.message || "Failed to fetch categories");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "An error occurred.");
    }
  };

  const createCategory = async (category) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/categories",
        category,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        setCategories((prev) => [...prev, data.category]);
        toast.success("Category created successfully");
        return true;
      } else {
        toast.error(data.message || "Failed to create category");
        return false;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "An error occurred.");
      return false;
    }
  };

  const updateCategory = async (id, updates) => {
    try {
      const { data } = await axios.put(
        backendUrl + `/categories/${id}`,
        updates,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        setCategories((prev) => prev.map((c) => (c._id === id ? data.category : c)));
        toast.success("Category updated");
        return true;
      } else {
        toast.error(data.message || "Failed to update category");
        return false;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "An error occurred.");
      return false;
    }
  };

  const deleteCategory = async (id) => {
    try {
      const { data } = await axios.delete(
        backendUrl + `/categories/${id}`,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        setCategories((prev) => prev.filter((c) => c._id !== id));
        toast.success("Category deleted");
        return true;
      } else {
        toast.error(data.message || "Failed to delete category");
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
    if (isLoggedIn) {
      fetchCredentials();
      fetchCategories();
    }
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
    categories,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    isAuthenticating,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
