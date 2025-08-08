import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "../ui/separator";
import { DollarSign, Lock, Map, Grid } from "lucide-react";

const platforms = [
  {
    name: "All",
    icon: Grid,
  },
  {
    name: "Logins",
    icon: Lock,
  },
  {
    name: "Financials",
    icon: DollarSign,
  },
  {
    name: "Addresses",
    icon: Map,
  },
];

export function NavPlatforms({ onPlatformSelect, selectedFilter }) {
  const handlePlatformClick = (platformName) => {
    onPlatformSelect({ type: "platform", value: platformName });
  };
  const { state } = useSidebar();

  return (
    <SidebarGroup>
      <Separator orientation="horizontal" className="mb-2" />
      <SidebarMenu>
        {platforms.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
              className={
                selectedFilter?.type === "platform" &&
                selectedFilter?.value === item.name
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : ""
              }
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePlatformClick(item.name);
                }}
                className={state === "collapsed" ? "flex items-center justify-center" : "flex items-center gap-2"}
              >
                <item.icon />
                {state !== "collapsed" && <span>{item.name}</span>}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
