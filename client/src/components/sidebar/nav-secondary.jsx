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
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { Textarea } from "../ui/textarea";
import { CategorySelect } from "../ui/category-select";
import { CategoryForm } from "./category-form";

export function NavSecondary({ items, ...props }) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { addCredential, categories } = useContext(AppContext);
  const [open, setOpen] = React.useState(false);
  const [showCategoryForm, setShowCategoryForm] = React.useState(false);
  const [form, setForm] = React.useState({
    url: "",
    name: "",
    category: "",
    email: "",
    password: "",
    platform: "Logins",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value) => {
    setForm((prev) => ({ ...prev, category: value }));
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
      notes: form.notes,
    };
    const success = await addCredential(payload);
    if (success) {
      setForm({
        url: "",
        name: "",
        category: "",
        email: "",
        password: "",
        platform: "Logins",
        notes: "",
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
      <SheetContent className="p-1" side="right">
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
            <Label htmlFor="category">Category</Label>
            <div className="flex gap-2">
              <CategorySelect
                value={form.category}
                onChange={handleCategoryChange}
                className="border rounded-md px-3 py-2 bg-background flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowCategoryForm(true)}
                className="px-3"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
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
          <div className="flex flex-col gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={form.notes || ""}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 bg-background resize-none"
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
      
      <CategoryForm 
        open={showCategoryForm} 
        onOpenChange={setShowCategoryForm}
        onCategoryCreated={() => {
          // Refresh categories after creation
        }}
      />
    </Sheet>
  );
}