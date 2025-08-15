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
import Logo from "../Logo";

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
              <div className="p-3">
                <Logo />
              </div>
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
