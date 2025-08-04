import * as React from "react";
import { Command } from "lucide-react";

import { NavCategories } from "@/components/sidebar/nav-categories";
import { NavPlatforms } from "@/components/sidebar/nav-platforms";
import { NavSecondary } from "@/components/sidebar/nav-secondary";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

export function AppSidebar({
  onPlatformSelect,
  onCategorySelect,
  selectedFilter,
  ...props
}) {
  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 ml-1 text-left text-sm leading-tight">
                  <Link to="/">
                    <span className="truncate font-medium text-2xl">
                      Sentinel
                    </span>
                  </Link>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavPlatforms
          onPlatformSelect={onPlatformSelect}
          selectedFilter={selectedFilter}
        />
        <NavCategories
          onCategorySelect={onCategorySelect}
          selectedFilter={selectedFilter}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavSecondary />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
