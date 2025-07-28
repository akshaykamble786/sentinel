import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { LoginItem } from "@/components/sidebar/login-items";
import { PasswordDetails } from "@/components/sidebar/password-details";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppContext } from "@/context/AppContext";
import { Bell, HelpCircle, Search } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const loginItems = [
  {
    id: 1,
    name: "Amazon Prime",
    email: "scottlaw@outlook.com",
    logo: "/placeholder.svg?height=24&width=24&text=AP",
  },
  {
    id: 2,
    name: "Apple TV+",
    email: "scottlaw@gmail.com",
    logo: "/placeholder.svg?height=24&width=24&text=TV",
  },
  {
    id: 3,
    name: "Disney+",
    email: "scottlaw@gmail.com",
    logo: "/placeholder.svg?height=24&width=24&text=D+",
  },
  {
    id: 4,
    name: "HBO Max",
    email: "scottlaw@gmail.com",
    logo: "/placeholder.svg?height=24&width=24&text=HBO",
  },
  {
    id: 5,
    name: "Hulu",
    email: "scottlaw@gmail.com",
    logo: "/placeholder.svg?height=24&width=24&text=H",
  },
  {
    id: 6,
    name: "NFL GamePass",
    email: "scottlaw@outlook.com",
    logo: "/placeholder.svg?height=24&width=24&text=NFL",
  },
  {
    id: 7,
    name: "Netflix",
    email: "scottlaw@gmail.com",
    logo: "/placeholder.svg?height=24&width=24&text=N",
  },
  {
    id: 8,
    name: "Spotify",
    email: "scottlaw@outlook.com",
    logo: "/placeholder.svg?height=24&width=24&text=S",
  },
  {
    id: 9,
    name: "Twitch",
    email: "scottlaw@gmail.com",
    logo: "/placeholder.svg?height=24&width=24&text=T",
  },
  {
    id: 10,
    name: "Youtube",
    email: "scottlaw@gmail.com",
    logo: "/placeholder.svg?height=24&width=24&text=YT",
  },
];

export default function Dashboard() {
  const [selectedItem, setSelectedItem] = useState(5); // Hulu selected by default

  const getSelectedService = () => {
    const item = loginItems.find((item) => item.id === selectedItem);
    if (!item) return null;

    return {
      name: item.name,
      logo: item.logo,
      website:
        item.name === "Hulu"
          ? "www.hulu.com"
          : item.name === "Netflix"
          ? "www.netflix.com"
          : item.name === "Spotify"
          ? "www.spotify.com"
          : item.name === "Amazon Prime"
          ? "www.amazon.com"
          : item.name === "Apple TV+"
          ? "www.apple.com"
          : item.name === "Disney+"
          ? "www.disneyplus.com"
          : item.name === "HBO Max"
          ? "www.hbomax.com"
          : item.name === "NFL GamePass"
          ? "www.nfl.com"
          : item.name === "Twitch"
          ? "www.twitch.tv"
          : item.name === "Youtube"
          ? "www.youtube.com"
          : "www.example.com",
      username: item.email,
      password: "••••••••",
      oneTimePassword:
        item.name === "Hulu"
          ? "806 094"
          : item.name === "Netflix"
          ? "123 456"
          : item.name === "Spotify"
          ? "789 012"
          : "345 678",
      sharedWith: {
        name: "Emma Green",
        email: "emmagreen@gmail.com",
        avatar: "/placeholder.svg?height=24&width=24&text=EG",
      },
      lastModified: "08/02/2022",
    };
  };

  const selectedService = getSelectedService();
  const { userData, backendUrl, isLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  if (isLoggedIn === false) return null;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-10 bg-muted/50 border-border"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 ml-auto mr-4">
            <ModeToggle />
            <Avatar className="size-8 ml-2">
              <AvatarImage
                src={
                  userData?.avatar
                    ? userData.avatar
                    : userData?.name
                    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        userData.name
                      )}`
                    : "Yo"
                }
              />
              <AvatarFallback>
                {userData?.name
                  ? userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                  : "U"}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>
        <div className="flex flex-1 overflow-hidden">
          {/* Login Items List */}
          <div className="flex-1 p-4 bg-background rounded-3xl overflow-y-auto">
            <div className="space-y-2">
              {loginItems.map((item) => (
                <LoginItem
                  key={item.id}
                  logo={item.logo}
                  name={item.name}
                  email={item.email}
                  isActive={selectedItem === item.id}
                  onSelect={() => setSelectedItem(item.id)}
                />
              ))}
            </div>
          </div>

          {/* Details Panel - Right Side */}
          {selectedService && <PasswordDetails service={selectedService} />}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
