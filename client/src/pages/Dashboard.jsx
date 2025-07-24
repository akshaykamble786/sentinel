import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Plus,
  ChevronDown,
  ChevronRight,
  Shield,
  CreditCard,
  FileText,
  Star,
  Eye,
  EyeOff,
  Copy,
  ExternalLink,
  MoreHorizontal,
  RefreshCw,
} from "lucide-react";
import { AppContext } from "@/context/AppContext";

const loginItems = [
  {
    id: "1",
    name: "Amazon Prime",
    email: "scottlaw@outlook.com",
    logo: "/placeholder.svg?height=32&width=32&text=Prime",
    category: "streaming",
    website: "www.amazon.com",
    password: "••••••••",
    lastModified: "08/02/2022",
  },
  {
    id: "2",
    name: "Apple TV+",
    email: "scottlaw@gmail.com",
    logo: "/placeholder.svg?height=32&width=32&text=TV",
    category: "streaming",
    website: "tv.apple.com",
    password: "••••••••",
    lastModified: "08/02/2022",
  },
  {
    id: "3",
    name: "Disney+",
    email: "scottlaw@gmail.com",
    logo: "/placeholder.svg?height=32&width=32&text=D+",
    category: "streaming",
    website: "www.disneyplus.com",
    password: "••••••••",
    lastModified: "08/02/2022",
  },
  {
    id: "4",
    name: "HBO Max",
    email: "scottlaw@gmail.com",
    logo: "/placeholder.svg?height=32&width=32&text=HBO",
    category: "streaming",
    website: "www.hbomax.com",
    password: "••••••••",
    lastModified: "08/02/2022",
  },
  {
    id: "5",
    name: "Hulu",
    email: "scottlaw@gmail.com",
    logo: "/placeholder.svg?height=32&width=32&text=Hulu",
    category: "streaming",
    website: "www.hulu.com",
    password: "••••••••",
    oneTimePassword: "806 094",
    sharedWith: {
      name: "Emma Green",
      email: "emmagreen@gmail.com",
      avatar: "/placeholder.svg?height=32&width=32&text=EG",
    },
    lastModified: "08/02/2022",
  },
  {
    id: "6",
    name: "NFL GamePass",
    email: "scottlaw@outlook.com",
    logo: "/placeholder.svg?height=32&width=32&text=NFL",
    category: "streaming",
    website: "www.nfl.com",
    password: "••••••••",
    lastModified: "08/02/2022",
  },
  {
    id: "7",
    name: "Netflix",
    email: "scottlaw@gmail.com",
    logo: "/placeholder.svg?height=32&width=32&text=N",
    category: "streaming",
    website: "www.netflix.com",
    password: "••••••••",
    lastModified: "08/02/2022",
  },
  {
    id: "8",
    name: "Spotify",
    email: "scottlaw@outlook.com",
    logo: "/placeholder.svg?height=32&width=32&text=♪",
    category: "social media",
    website: "www.spotify.com",
    password: "••••••••",
    lastModified: "08/02/2022",
  },
];

export default function Dashboard() {
  const [selectedItem, setSelectedItem] = useState(loginItems[4]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({
    streaming: true,
    socialMedia: true,
    workTools: false,
    important: false,
  });

  const categories = [
    { id: "important", name: "Important", icon: "🔴", count: 0 },
    { id: "socialMedia", name: "Social media", icon: "🟠", count: 2 },
    { id: "streaming", name: "Streaming", icon: "🟢", count: 7 },
    { id: "workTools", name: "Work tools", icon: "🔵", count: 0 },
  ];

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const filteredItems = loginItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-slate-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-emerald-400" />
            <span className="text-xl font-semibold">Sentinel</span>
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={selectedItem.sharedWith.avatar || "/placeholder.svg"}
              />
              <AvatarFallback>EG</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4">
          <nav className="space-y-2 mb-6">
            <Button
              variant="ghost"
              className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700"
            >
              <Shield className="w-4 h-4 mr-3" />
              Logins
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-700"
            >
              <CreditCard className="w-4 h-4 mr-3" />
              Credit cards
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-700"
            >
              <FileText className="w-4 h-4 mr-3" />
              Notes
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-700"
            >
              <Star className="w-4 h-4 mr-3" />
              Favourites
            </Button>
          </nav>

          {/* Categories */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-slate-400">Categories</h3>
              <Button
                size="sm"
                variant="ghost"
                className="w-6 h-6 p-0 text-slate-400 hover:text-white"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-1">
              {categories.map((category) => (
                <div key={category.id}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700 p-2"
                    onClick={() => toggleCategory(category.id)}
                  >
                    {expandedCategories[category.id] ? (
                      <ChevronDown className="w-3 h-3 mr-2" />
                    ) : (
                      <ChevronRight className="w-3 h-3 mr-2" />
                    )}
                    <span className="mr-2">{category.icon}</span>
                    <span className="flex-1 text-left">{category.name}</span>
                    {category.count > 0 && (
                      <Badge
                        variant="secondary"
                        className="bg-slate-600 text-slate-200 text-xs"
                      >
                        {category.count}
                      </Badge>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* New Item Button */}
        <div className="p-4 border-t border-slate-700">
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Item
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Items List */}
        <div className="w-80 bg-slate-850 border-r border-slate-700">
          {/* Search */}
          <div className="p-4 border-b border-slate-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
              />
            </div>
          </div>

          {/* Items */}
          <div className="overflow-y-auto">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`p-4 border-b border-slate-700 cursor-pointer hover:bg-slate-700 ${
                  selectedItem.id === item.id
                    ? "bg-blue-600 hover:bg-blue-600"
                    : ""
                }`}
                onClick={() => setSelectedItem(item)}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.logo || "/placeholder.svg"}
                    alt={item.name}
                    className="w-8 h-8 rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-white truncate">
                      {item.name}
                    </div>
                    <div className="text-sm text-slate-400 truncate">
                      {item.email}
                    </div>
                  </div>
                  {selectedItem.id === item.id && (
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-6 h-6 p-0 text-white hover:bg-blue-700"
                      >
                        <Star className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-6 h-6 p-0 text-white hover:bg-blue-700"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-6 h-6 p-0 text-white hover:bg-blue-700"
                      >
                        <MoreHorizontal className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="flex-1 bg-slate-900">
          {selectedItem && (
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={selectedItem.logo || "/placeholder.svg"}
                  alt={selectedItem.name}
                  className="w-12 h-12 rounded"
                />
                <div>
                  <h1 className="text-2xl font-semibold text-white">
                    {selectedItem.name}
                  </h1>
                  <p className="text-slate-400">Streaming</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-6">
                {/* Website */}
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Website
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-white">{selectedItem.website}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-6 h-6 p-0 text-slate-400 hover:text-white"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Username
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-white">{selectedItem.email}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-6 h-6 p-0 text-slate-400 hover:text-white"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Password
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-mono">
                      {showPassword ? "mypassword123" : selectedItem.password}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-6 h-6 p-0 text-slate-400 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-3 h-3" />
                      ) : (
                        <Eye className="w-3 h-3" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-6 h-6 p-0 text-slate-400 hover:text-white"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {/* One-time Password */}
                {selectedItem.oneTimePassword && (
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">
                      One-time password
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono">
                        {selectedItem.oneTimePassword}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-6 h-6 p-0 text-slate-400 hover:text-white"
                      >
                        <RefreshCw className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-6 h-6 p-0 text-slate-400 hover:text-white"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Shared With */}
                {selectedItem.sharedWith && (
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">
                      Shared with
                    </label>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          src={
                            selectedItem.sharedWith.avatar || "/placeholder.svg"
                          }
                        />
                        <AvatarFallback>EG</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-white text-sm">
                          {selectedItem.sharedWith.name}
                        </div>
                        <div className="text-slate-400 text-xs">
                          {selectedItem.sharedWith.email}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Last Modified */}
                <div className="pt-4 border-t border-slate-700">
                  <p className="text-sm text-slate-400">
                    Last modified: {selectedItem.lastModified}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
