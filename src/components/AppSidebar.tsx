import {
  Home,
  FileText,
  Search,
  MessageSquare,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Create Quote",
    url: "/quote",
    icon: FileText,
  },
  {
    title: "Retrieve Quote",
    url: "/saved-quotes",
    icon: Search,
  },
  {
    title: "Chat",
    url: "/quote/chat",
    icon: MessageSquare,
  },
  {
    title: "Users",
    url: "#",
    icon: Users,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarContent className="py-6 group hover:w-64 transition-all duration-300">
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 py-4 mb-4 text-xl font-semibold text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Quote Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="px-2 mb-3">
                  <SidebarMenuButton
                    onClick={() => navigate(item.url)}
                    tooltip={item.title}
                    className="w-full px-4 py-3 text-base font-medium transition-colors hover:bg-purple-50 hover:text-purple-600 rounded-lg group"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}