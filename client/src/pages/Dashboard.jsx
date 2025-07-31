import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { CredentialsList } from "@/components/sidebar/login-items";
import { PasswordDetails } from "@/components/sidebar/password-details";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppContext } from "@/context/AppContext";
import { Search } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { credentials, isLoggedIn, userData, editCredential, deleteCredential } = useContext(AppContext);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/login");
    }
    if (isLoggedIn && credentials.length > 0 && !selectedId) {
      setSelectedId(credentials[0]._id);
    }
  }, [isLoggedIn, navigate, credentials, selectedId]);

  if (isLoggedIn === false) return null;

  const selectedCredential = credentials.find((c) => c._id === selectedId);

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
          {/* Credentials List */}
          <div className="flex-1 p-4 bg-background rounded-3xl overflow-y-auto">
            <div className="space-y-2">
              <CredentialsList
                credentials={credentials}
                selectedId={selectedId}
                onSelect={(cred) => setSelectedId(cred._id)}
              />
            </div>
          </div>

            <PasswordDetails
              credential={selectedCredential}
              onEdit={(updates) => editCredential(selectedCredential._id, updates)}
              onDelete={async () => {
                await deleteCredential(selectedCredential._id);
                setSelectedId(null);
              }}
            />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}