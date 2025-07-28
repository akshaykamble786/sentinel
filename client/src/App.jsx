import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
// import Login from "./pages/Login";
// import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import AuthForm from "./pages/AuthForm";
import { Toaster } from "./components/ui/sonner";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<LandingPage />} />
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
