import { Edit, MoreHorizontal, Eye, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";

export function PasswordDetails({ credential, onEdit, onDelete }) {
  const [showPassword, setShowPassword] = useState(false);
  if (!credential) return null;

  const getCategoryColor = (category) => {
    switch (category) {
      case "Streaming":
        return "bg-green-600";
      case "Social media":
        return "bg-orange-500";
      case "Sports":
        return "bg-yellow-500";
      case "Important":
      default:
        return "bg-pink-500";
    }
  };

  const categoryColor = getCategoryColor(credential.category);

  return (
    <div className="w-102 bg-card border-l border-r rounded-l-2xl rounded-br-2xl p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg overflow-hidden bg-background border border-border flex items-center justify-center">
            <img
              src={credential.logo || "/placeholder.svg"}
              alt={credential.name}
              className="h-8 w-8 object-contain"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold">{credential.name}</h2>
            <Badge
              variant="secondary"
              className={`${categoryColor} text-white text-xs`}
            >
              {credential.category}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onEdit}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onDelete}
          >
            <Trash className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground">Website</label>
          <div className="text-sm mt-1 text-foreground">
            <a
              href={credential.site}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {credential.site}
            </a>
          </div>
        </div>

        <div>
          <label className="text-sm text-muted-foreground">Username</label>
          <div className="text-sm mt-1 text-foreground">
            {credential.username}
          </div>
        </div>

        <div>
          <label className="text-sm text-muted-foreground">Password</label>
          <div className="flex items-center justify-between mt-1">
            <div className="text-sm text-foreground">
              {showPassword ? credential.password : "• • • • • • •"}
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 hover:bg-accent"
                onClick={() => setShowPassword((v) => !v)}
              >
                <Eye className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 hover:bg-accent"
                onClick={() => {
                  navigator.clipboard.writeText(credential.password);
                  toast.success('Password copied');
                }}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        {credential.notes && (
          <div>
            <label className="text-sm text-muted-foreground">Notes</label>
            <div className="text-sm mt-1 text-foreground">
              {credential.notes}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-border">
          <div className="text-xs text-muted-foreground">
            Last modified:{" "}
            {credential.updatedAt
              ? new Date(credential.updatedAt).toLocaleString()
              : "-"}
          </div>
        </div>
      </div>
    </div>
  );
}