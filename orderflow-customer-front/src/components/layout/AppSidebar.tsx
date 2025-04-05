
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { NavLink } from 'react-router-dom';
import { Home, Users, FileText, LogOut } from 'lucide-react';

export function AppSidebar() {
  const { user, logout } = useAuth();
  
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-brand-500 p-1">
            <div className="h-7 w-7 text-white font-bold flex items-center justify-center">
              CRM
            </div>
          </div>
          <div className="font-semibold text-lg flex-1">OrderFlow</div>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                      isActive ? "bg-sidebar-accent/50 text-sidebar-accent-foreground" : ""
                    }
                  >
                    <Home className="h-5 w-5" />
                    <span>Dashboard</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/orders" 
                    className={({ isActive }) => 
                      isActive ? "bg-sidebar-accent/50 text-sidebar-accent-foreground" : ""
                    }
                  >
                    <FileText className="h-5 w-5" />
                    <span>Orders</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/customers" 
                    className={({ isActive }) => 
                      isActive ? "bg-sidebar-accent/50 text-sidebar-accent-foreground" : ""
                    }
                  >
                    <Users className="h-5 w-5" />
                    <span>Customers</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="mb-2 px-2 py-1.5">
          <div className="text-xs text-muted-foreground">Logged in as:</div>
          <div className="font-medium text-sm truncate">{user?.name || 'Unknown User'}</div>
          <div className="text-xs text-muted-foreground">{user?.role}</div>
        </div>
        
        <button
          onClick={logout}
          className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-sidebar-accent/50"
        >
          <LogOut className="h-4 w-4" />
          <span>Log out</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
