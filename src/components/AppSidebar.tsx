import {
    Home,
    FileText,
    Search,
    MessageSquare,
    Users,
    Package,
    PoundSterling,
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
        title: "Users",
        url: "/users",
        icon: Users,
    },
    {
        title: "Products",
        url: "/products",
        icon: Package,
    },
    {
        title: "Pricing",
        url: "/pricing",
        icon: PoundSterling,
    },
];

export function AppSidebar() {
    const navigate = useNavigate();

    const handleNavigation = (url) => {
        navigate(url);
        if (url === "/quote")
            window.location.reload();
    };
    return (
        <Sidebar>
            <SidebarContent className="py-6">
                <SidebarGroup>
                    <SidebarGroupLabel className="px-6 py-4 mb-4 text-xl font-semibold text-purple-600">
                        Quote Management
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title} className="px-2 mb-3">
                                    <SidebarMenuButton
                                        onClick={() => handleNavigation(item.url)}
                                        tooltip={item.title}
                                        className="w-full p-6 text-lg font-medium tracking-wide transition-all duration-300
                            bg-white/50 backdrop-blur-sm border border-purple-100
                            hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200
                            rounded-2xl shadow-sm hover:shadow-md
                            flex items-center justify-center md:justify-start gap-4"
                                    >
                                        <item.icon className="w-6 h-6" />
                                        <span>{item.title}</span>
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