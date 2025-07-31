import * as React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useSidebar } from "../ui/sidebar";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "../ui/sheet";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

export function NavSecondary({ items, ...props }) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { addCredential } = useContext(AppContext);
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    url: "",
    name: "",
    category: "Important",
    email: "",
    password: "",
    platform: "Logins",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      site: form.url,
      name: form.name,
      category: form.category,
      username: form.email,
      password: form.password,
      platform: form.platform,
      notes: "", 
    };
    const success = await addCredential(payload);
    if (success) {
      setForm({
        url: "",
        name: "",
        category: "Important",
        email: "",
        password: "",
        platform: "Logins",
      });
      setOpen(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground justify-center"
          {...props}
        >
          <Plus className="size-4" />
          {!isCollapsed && <span>New Item</span>}
        </Button>
      </SheetTrigger>
      <SheetContent className="p-2" side="right">
        <SheetHeader>
          <SheetTitle>Add New Item</SheetTitle>
        </SheetHeader>
        <form className="flex flex-col gap-4 px-2" onSubmit={handleSave}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="platform">Platform</Label>
            <select
              id="platform"
              name="platform"
              value={form.platform}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 bg-background"
              required
            >
              <option value="Logins">Logins</option>
              <option value="Financials">Financials</option>
              <option value="Addresses">Addresses</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              name="url"
              value={form.url}
              onChange={handleChange}
              placeholder="https://example.com"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 bg-background"
              required
            >
              <option value="Important">Important</option>
              <option value="Social media">Social Media</option>
              <option value="Streaming">Streaming</option>
              <option value="Sports">Sports</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="user@email.com"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <SheetFooter className="flex-row justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              className="mr-2"
              onClick={() => document.activeElement.blur()}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
