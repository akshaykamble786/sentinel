import React, { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { Menu, X, CircleDot, LayoutDashboard, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { toast } from "sonner";

const Header = () => {
  const [activePage, setActivePage] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedIn } =
    useContext(AppContext);

  const logout = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/auth/logout");
      data.success && setIsLoggedIn(false);
      data.success && setUserData(false);
      navigate("/");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleNavClick = (page) => (e) => {
    e.preventDefault();
    setActivePage(page);
    const element = document.getElementById(page);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="top-0 z-50 pt-6 px-4">
      <header className="w-full max-w-7xl mx-auto py-3 px-6 md:px-8 flex items-center justify-between">
        <div className="p-3">
          <Logo />
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-3 rounded-2xl text-muted-foreground hover:text-foreground"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center fixed top-10 left-1/2 -translate-x-1/2 z-50">
          <div className="rounded-full px-1 py-1 backdrop-blur-md bg-background/80 border border-border shadow-lg">
            <ToggleGroup
              type="single"
              value={activePage}
              onValueChange={(value) => value && setActivePage(value)}
            >
              <ToggleGroupItem
                value="features"
                className={cn(
                  "px-4 py-2 rounded-full transition-colors relative",
                  activePage === "features"
                    ? "text-accent-foreground bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
                onClick={handleNavClick("features")}
              >
                <CircleDot size={16} className="inline-block mr-1.5" /> Features
              </ToggleGroupItem>
              <ToggleGroupItem
                value="security"
                className={cn(
                  "px-4 py-2 rounded-full transition-colors relative",
                  activePage === "security"
                    ? "text-accent-foreground bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
                onClick={handleNavClick("security")}
              >
                <CircleDot size={16} className="inline-block mr-1.5" /> Security
              </ToggleGroupItem>
              <ToggleGroupItem
                value="faqs"
                className={cn(
                  "px-4 py-2 rounded-full transition-colors relative",
                  activePage === "faqs"
                    ? "text-accent-foreground bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
                onClick={handleNavClick("faqs")}
              >
                <LayoutDashboard size={16} className="inline-block mr-1.5" />{" "}
                FAQ
              </ToggleGroupItem>
              <ToggleGroupItem
                value="pricing"
                className={cn(
                  "px-4 py-2 rounded-full transition-colors relative",
                  activePage === "pricing"
                    ? "text-accent-foreground bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
                onClick={handleNavClick("pricing")}
              >
                <DollarSign size={16} className="inline-block mr-1.5" /> Pricing
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </nav>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-4 right-4 bg-background/95 backdrop-blur-md py-4 px-6 border border-border rounded-2xl shadow-lg z-50">
            <div className="flex flex-col gap-4">
              <a
                href="#features"
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  activePage === "features"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                onClick={handleNavClick("features")}
              >
                <CircleDot size={16} className="inline-block mr-1.5" /> Features
              </a>
              <a
                href="#faq"
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  activePage === "faq"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                onClick={handleNavClick("faqs")}
              >
                <LayoutDashboard size={16} className="inline-block mr-1.5" />{" "}
                FAQ
              </a>
              <a
                href="#pricing"
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  activePage === "pricing"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                onClick={handleNavClick("pricing")}
              >
                <DollarSign size={16} className="inline-block mr-1.5" /> Pricing
              </a>

              {/* Add theme toggle for mobile */}
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm text-muted-foreground">Theme</span>
                <div className="flex items-center gap-2">
                  <ModeToggle />
                </div>
              </div>

              <div className="rounded-2xl">
                {userData ? (
                  <div>
                    <Button onClick={logout}>Log out</Button>
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
                        className="text-gray-300 hover:text-white mr-2 hover:bg-gray-800"
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
              </div>
            </div>
          </div>
        )}

        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          <div className="rounded-2xl">
            {userData ? (
              <div>
                <Button onClick={logout}>Log out</Button>
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
                    className="text-gray-300 hover:text-white mr-2 hover:bg-gray-800"
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
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
