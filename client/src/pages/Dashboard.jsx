import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { CredentialsList } from "@/components/sidebar/login-items";
import { PasswordDetails } from "@/components/sidebar/password-details";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { AppContext } from "@/context/AppContext";
import { Search } from "lucide-react";
import {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";

export default function Dashboard() {
  const {
    credentials,
    isLoggedIn,
    userData,
    editCredential,
    deleteCredential,
    searchCredentials,
    fetchCredentials,
  } = useContext(AppContext);

  const [selectedId, setSelectedId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [shouldRestoreFocus, setShouldRestoreFocus] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({
    type: "platform",
    value: "All",
  });

  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  const filteredCredentials = credentials.filter((credential) => {
    if (!selectedFilter) return true;

    if (selectedFilter.type === "category") {
      return credential.category === selectedFilter.value;
    } else if (selectedFilter.type === "platform") {
      if (selectedFilter.value === "All") return true;
      return credential.platform === selectedFilter.value;
    }

    return true;
  });

  const handlePlatformSelect = (filter) => {
    setSelectedFilter(filter);
    setSearchQuery("");
    debouncedSearch("");
  };

  const handleCategorySelect = (filter) => {
    setSelectedFilter(filter);
    setSearchQuery("");
    debouncedSearch("");
  };

  const debouncedSearch = useCallback(
    (() => {
      let timeoutId;
      return (query) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
          if (query.trim() === "") {
            await fetchCredentials();
          } else {
            setIsSearching(true);
            await searchCredentials(query);
            setIsSearching(false);
          }
          setShouldRestoreFocus(true);
        }, 300);
      };
    })(),
    [searchCredentials, fetchCredentials]
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSelectedFilter({ type: "platform", value: "All" });
    debouncedSearch(query);
  };

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/login");
    }
    if (isLoggedIn && filteredCredentials.length > 0 && !selectedId) {
      setSelectedId(filteredCredentials[0]._id);
    }
  }, [isLoggedIn, navigate, filteredCredentials, selectedId]);

  useEffect(() => {
    if (!isLoggedIn) {
      setSearchQuery("");
      setSelectedFilter({ type: "platform", value: "All" });
    }
  }, [isLoggedIn]);

  useLayoutEffect(() => {
    if (shouldRestoreFocus && credentials.length > 0) {
      searchInputRef.current.focus();
      setShouldRestoreFocus(false);
    }
  }, [shouldRestoreFocus, credentials]);

  if (isLoggedIn === false) return null;

  const selectedCredential = filteredCredentials.find(
    (c) => c._id === selectedId
  );

  const handleEdit = (credential) => {
    setEditForm({
      site: credential.site,
      name: credential.name,
      category: credential.category,
      username: credential.username,
      password: credential.password,
      platform: credential.platform,
      notes: credential.notes || "",
    });
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    const success = await editCredential(selectedCredential._id, editForm);
    if (success) {
      setIsEditing(false);
      setEditForm({});
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm({});
  };

  return (
    <SidebarProvider>
      <AppSidebar
        onPlatformSelect={handlePlatformSelect}
        onCategorySelect={handleCategorySelect}
        selectedFilter={selectedFilter}
      />
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
                ref={searchInputRef}
                placeholder={"Search credentials..."}
                className="pl-10 bg-muted/50 border-border"
                value={searchQuery}
                onChange={handleSearchChange}
                disabled={isSearching}
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                </div>
              )}
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
                credentials={filteredCredentials}
                selectedId={selectedId}
                onSelect={(cred) => setSelectedId(cred._id)}
              />
            </div>
          </div>

          <PasswordDetails
            credential={selectedCredential}
            onEdit={handleEdit}
            onDelete={async () => {
              await deleteCredential(selectedCredential._id);
              setSelectedId(null);
            }}
          />
        </div>
      </SidebarInset>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Credential</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={editForm.name || ""}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, name: e.target.value }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="site" className="text-right">
                URL
              </Label>
              <Input
                id="site"
                value={editForm.site || ""}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, site: e.target.value }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                value={editForm.username || ""}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, username: e.target.value }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={editForm.password || ""}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, password: e.target.value }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="platform" className="text-right">
                Platform
              </Label>
              <select
                id="platform"
                value={editForm.platform || "Logins"}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, platform: e.target.value }))
                }
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="Logins">Logins</option>
                <option value="Financials">Financials</option>
                <option value="Addresses">Addresses</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <select
                id="category"
                value={editForm.category || "Important"}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, category: e.target.value }))
                }
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="Important">Important</option>
                <option value="Streaming">Streaming</option>
                <option value="Social media">Social media</option>
                <option value="Sports">Sports</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Textarea
                id="notes"
                value={editForm.notes || ""}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, notes: e.target.value }))
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelEdit}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}
