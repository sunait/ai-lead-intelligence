import {
  LayoutDashboard,
  History,
  Settings,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";


const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    name: "History",
    icon: History,
    active: false,
  },
  {
    name: "Settings",
    icon: Settings,
    active: false,
  },
];


export function Sidebar() {
  return (
    <aside className="w-64 min-h-screen border-r bg-sidebar p-6">

      <div className="flex items-center gap-2.5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
          AI
        </div>

        <div>
          <h2 className="text-sm font-semibold leading-tight">
            Lead Intelligence
          </h2>

          <p className="text-xs text-muted-foreground">
            Sales AI platform
          </p>
        </div>
      </div>


      <nav className="mt-8 flex flex-col gap-1">

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (
            <div
              key={item.name}
              className={
                item.active
                  ? "flex items-center gap-3 rounded-lg bg-sidebar-accent px-3 py-2 text-sm font-medium text-sidebar-accent-foreground"
                  : "flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground/70"
              }
            >
              <span className="flex items-center gap-3">
                <Icon size={16} />
                {item.name}
              </span>

              {!item.active && (
                <Badge variant="outline" className="h-4 px-1.5 text-[10px]">
                  Soon
                </Badge>
              )}
            </div>
          );

        })}

      </nav>


    </aside>
  );
}