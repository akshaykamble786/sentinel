import {
  Edit,
  MoreHorizontal,
  Eye,
  Copy,
  Trash,
  Edit2,
  Calendar,
  RefreshCcw,
  Wand,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useContext, useEffect } from "react";
import { toast } from "sonner";
import { getCredentialLogo } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AppContext } from "@/context/AppContext";

export function PasswordDetails({ credential, onEdit, onDelete }) {
  const [showPassword, setShowPassword] = useState(false);
  const { categories } = useContext(AppContext);

  useEffect(() => {
    let timer;
    if (showPassword) {
      timer = setTimeout(() => {
        setShowPassword(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showPassword]);

  if (!credential) return null;

  const categoryObj = categories.find(
    (cat) => cat.name === credential.category
  );
  const categoryColor = categoryObj ? categoryObj.color : "#6366f1";

  return (
    <div className="w-102 bg-card rounded-l-2xl rounded-br-2xl p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg overflow-hidden bg-background border border-border flex items-center justify-center">
            <img
              src={getCredentialLogo(credential)}
              alt={credential.name}
              className="h-8 w-8 object-contain"
              onError={(e) => {
                e.target.src = "/placeholder.svg";
              }}
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold">{credential.name}</h2>
            <Badge
              variant="secondary"
              style={{ backgroundColor: categoryColor, color: "#fff" }}
              className="text-white text-xs"
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
            onClick={() => onEdit(credential)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Trash className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your credential and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
              <span>
                {showPassword ? credential.password : "• • • • • • •"}
              </span>
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
                  toast.success("Password copied");

                  setTimeout(async () => {
                    try {
                      await navigator.clipboard.writeText("");
                    } catch (err) {
                      console.error("Failed to clear clipboard:", err);
                    }
                  }, 3000);
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

        <div className="pt-4 border-t space-y-1 flex flex-col gap-1 space-y-2">
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3 mr-1" />
            Created:{" "}
            {credential.createdAt
              ? new Date(credential.createdAt)
                  .toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
              : "-"}
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Edit2 className="h-3 w-3 mr-1" />
            Last modified:{" "}
            {credential.updatedAt
              ? new Date(credential.updatedAt).toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
              : "-"}
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Wand2 className="h-3 w-3 mr-1" />
            Last autofill:{" "}
            {credential.lastAutofill
              ? new Date(credential.lastAutofill).toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
              : "-"}
          </div>
        </div>
      </div>
    </div>
  );
}
