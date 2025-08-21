import { Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import AuthForm from "./pages/AuthForm";
import { Toaster } from "./components/ui/sonner";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const isExtensionEnv = (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.id) || import.meta.env.MODE === "extension";

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={isExtensionEnv ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/sign-up" element={<AuthForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
