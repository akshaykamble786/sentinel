import { ChevronDown, ChevronRight, Plus, MoreHorizontal, Pencil, Trash2 } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuAction,
} from "@/components/ui/sidebar"
import { useState, useContext } from "react"
import { useSidebar } from "@/components/ui/sidebar"
import { AppContext } from "@/context/AppContext"
import { CategoryForm } from "./category-form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CategoryEditDialog } from "./category-edit-dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function NavCategories({ onCategorySelect, selectedFilter }) {
  const [categoriesOpen, setCategoriesOpen] = useState(true)
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
  const [pendingDeleteCategory, setPendingDeleteCategory] = useState(null)
  const { state } = useSidebar();
  const { categories, deleteCategory } = useContext(AppContext);
  
  const handleCategoryClick = (categoryTitle) => {
    onCategorySelect({ type: 'category', value: categoryTitle });
  };

  const handleCreateCategory = () => {
    setShowCategoryForm(true);
  };

  return (
    <SidebarGroup>
      <Collapsible open={categoriesOpen} onOpenChange={setCategoriesOpen}>
        <SidebarGroup className="p-0">
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger className="flex w-full items-center justify-between hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <span>Categories</span>
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 cursor-pointer hover:text-primary" onClick={(e) => {
                  e.stopPropagation();
                  handleCreateCategory();
                }} />
                {categoriesOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </div>
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {categories.map((category) => (
                  <SidebarMenuItem key={category._id || category.name} className="group relative">
                    <SidebarMenuButton 
                      asChild
                      className={`${selectedFilter?.type === 'category' && selectedFilter?.value === category.name ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""} pr-8`}
                    >
                      <a 
                        href="#" 
                        className={state === "collapsed" ? "flex items-center justify-center" : "flex items-center gap-3"}
                        onClick={(e) => {
                          e.preventDefault();
                          handleCategoryClick(category.name);
                        }}
                      >
                        <div 
                          className="size-3 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        />
                        {state !== "collapsed" && <span>{category.name}</span>}
                      </a>
                    </SidebarMenuButton>
                    <Popover>
                      <PopoverTrigger asChild>
                        <SidebarMenuAction
                          showOnHover
                          aria-label="Category actions"
                          className="z-10 opacity-0 md:opacity-0 group-hover:opacity-100 group-hover/menu-item:opacity-100 peer-hover/menu-button:opacity-100 hover:opacity-100"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </SidebarMenuAction>
                      </PopoverTrigger>
                      <PopoverContent align="end" className="w-44 p-1">
                        <div className="flex flex-col">
                          <Button
                            variant="ghost"
                            className="justify-start gap-2 h-8"
                            disabled={category.isDefault || !category._id}
                            onClick={() => {
                              setSelectedCategory(category);
                              setShowEditDialog(true);
                            }}
                          >
                            <Pencil className="w-4 h-4" /> Edit
                          </Button>
                          <Button
                            variant="ghost"
                            className="justify-start gap-2 h-8 text-destructive hover:text-destructive"
                            disabled={category.isDefault || !category._id}
                            onClick={() => {
                              setPendingDeleteCategory(category)
                              setConfirmDeleteOpen(true)
                            }}
                          >
                            <Trash2 className="w-4 h-4" /> Delete
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
      
      <CategoryForm 
        open={showCategoryForm} 
        onOpenChange={setShowCategoryForm}
        onCategoryCreated={() => {
          // Refresh categories after creation
        }}
      />
      <CategoryEditDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        category={selectedCategory}
      />

      <AlertDialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{pendingDeleteCategory?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={async () => {
                if (pendingDeleteCategory?._id) {
                  await deleteCategory(pendingDeleteCategory._id)
                }
                setConfirmDeleteOpen(false)
                setPendingDeleteCategory(null)
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarGroup>
  )
}