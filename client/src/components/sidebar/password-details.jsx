import { Star, Edit, MoreHorizontal, Eye, Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function PasswordDetails({ service }) {
  const getCategory = (serviceName) => {
    const streamingServices = [
      "Hulu",
      "Netflix",
      "Disney+",
      "HBO Max",
      "Apple TV+",
      "Amazon Prime",
      "Youtube",
      "Twitch",
    ];
    const socialServices = ["Spotify"];

    if (streamingServices.includes(serviceName)) {
      return { name: "Streaming", color: "bg-green-600" };
    } else if (socialServices.includes(serviceName)) {
      return { name: "Social media", color: "bg-orange-500" };
    } else if (serviceName === "NFL GamePass") {
      return { name: "Sports", color: "bg-yellow-500" };
    }
    return { name: "Important", color: "bg-pink-500" };
  };

  const category = getCategory(service.name);

  return (
    <div className="w-102 bg-card border-l border-r rounded-l-2xl p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg overflow-hidden bg-background border border-border flex items-center justify-center">
            <img
              src={service.logo || "/placeholder.svg"}
              alt={service.name}
              className="h-8 w-8 object-contain"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold">{service.name}</h2>
            <Badge
              variant="secondary"
              className={`${category.color} text-white text-xs`}
            >
              {category.name}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Star className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground">Website</label>
          <div className="text-sm mt-1 text-foreground">{service.website}</div>
        </div>

        <div>
          <label className="text-sm text-muted-foreground">Username</label>
          <div className="text-sm mt-1 text-foreground">{service.username}</div>
        </div>

        <div>
          <label className="text-sm text-muted-foreground">Password</label>
          <div className="flex items-center justify-between mt-1">
            <div className="text-sm text-foreground">{"• • • • • • •"}</div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 hover:bg-accent"
              >
                <Eye className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 hover:bg-accent"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm text-muted-foreground">
            One-time password
          </label>
          <div className="flex items-center justify-between mt-1">
            <div className="text-sm font-mono text-foreground">
              {service.oneTimePassword}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:bg-accent"
            >
              <RefreshCw className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <div>
          <label className="text-sm text-muted-foreground">Shared with</label>
          <div className="flex items-center gap-2 mt-2">
            <Avatar className="h-6 w-6">
              <AvatarImage
                src={service.sharedWith.avatar || "/placeholder.svg"}
              />
              <AvatarFallback>EG</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-medium text-foreground">
                {service.sharedWith.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {service.sharedWith.email}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="text-xs text-muted-foreground">
            Last modified: {service.lastModified}
          </div>
        </div>
      </div>
    </div>
  );
}
