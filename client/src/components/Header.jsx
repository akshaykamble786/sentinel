import { Menu, Shield } from "lucide-react";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { AppContext } from "../context/AppContext";
import { toast } from "sonner";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedIn } =
    useContext(AppContext);

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/auth/logout");
      data.success && setIsLoggedIn(false);
      data.success && setUserData(false);
      navigate("/");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <header className="bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield className="h-8 w-8 text-white" />
          <span className="text-2xl font-semibold text-white">
            Sentinel
          </span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="#features"
            className="text-gray-300 hover:text-white transition-colors font-medium"
          >
            Features
          </Link>
          <Link
            href="#security"
            className="text-gray-300 hover:text-white transition-colors font-medium"
          >
            Security
          </Link>
          <Link
            href="#pricing"
            className="text-gray-300 hover:text-white transition-colors font-medium"
          >
            Pricing
          </Link>
          {userData ? (
            <div>
              <Button onClick={logout}>Logout</Button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  Login
                </Button>
              </Link>
              <Link
                to="/sign-up"
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                <Button
                  size="sm"
                  className="text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </nav>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
