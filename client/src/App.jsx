import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
// import Login from "./pages/Login";
// import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import AuthForm from "./pages/AuthForm";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/sign-up" element={<AuthForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
