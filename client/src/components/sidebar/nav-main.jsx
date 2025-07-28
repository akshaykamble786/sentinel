import { ChevronDown, ChevronRight, Plus } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useState } from "react"
import { Separator } from "../ui/separator"

const categories = [
  {
    title: "Important",
    color: "bg-pink-500",
  },
  {
    title: "Social media",
    color: "bg-orange-500",
  },
  {
    title: "Streaming",
    color: "bg-green-500",
  },
  {
    title: "Sports",
    color: "bg-yellow-500",
  },
]
export function NavMain({
  items,
}) {
  const [categoriesOpen, setCategoriesOpen] = useState(true)
  return (
    <SidebarGroup>
      <Collapsible open={categoriesOpen} onOpenChange={setCategoriesOpen}>
        <SidebarGroup className="p-0">
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger className="flex w-full items-center justify-between hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <span>Categories</span>
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                {categoriesOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </div>
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {categories.map((category) => (
                  <SidebarMenuItem key={category.title}>
                    <SidebarMenuButton asChild>
                      <a href="#" className="flex items-center gap-3">
                        <div className={`size-3 rounded-full ${category.color}`} />
                        <span>{category.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
    </SidebarGroup>
  )
}