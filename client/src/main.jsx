import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AppContextProvider } from "./context/AppContext";
import { BrowserRouter, HashRouter } from "react-router-dom";
import axios from "axios";
import { ThemeProvider } from "./components/theme/theme-provider";

axios.defaults.withCredentials = true;

const isExtensionEnv = (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.id) || import.meta.env.MODE === "extension";

const Router = isExtensionEnv ? HashRouter : BrowserRouter;

if (isExtensionEnv) {
  try {
    document.documentElement.classList.add('extension-popup')
  } catch (_) {}
}

function AppWrapper() {
  return (
    <AppContextProvider>
      <App />
    </AppContextProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <Router>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppWrapper />
    </ThemeProvider>
  </Router>
);
