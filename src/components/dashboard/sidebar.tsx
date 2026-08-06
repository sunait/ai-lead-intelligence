import {
  LayoutDashboard,
  Search,
  History,
  Settings,
} from "lucide-react";

import { Button } from "@/components/ui/button";


const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Analyze Lead",
    icon: Search,
  },
  {
    name: "History",
    icon: History,
  },
  {
    name: "Settings",
    icon: Settings,
  },
];


export function Sidebar() {
  return (
    <aside className="w-64 min-h-screen border-r bg-background p-6">

      <div>
        <h2 className="text-xl font-bold">
          AI Lead Intelligence
        </h2>

        <p className="text-sm text-muted-foreground mt-1">
          Sales intelligence platform
        </p>
      </div>


      <nav className="mt-8 flex flex-col gap-2">

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (
            <Button
              key={item.name}
              variant="ghost"
              className="justify-start gap-3"
            >

              <Icon size={18}/>

              {item.name}

            </Button>
          );

        })}

      </nav>


    </aside>
  );
}