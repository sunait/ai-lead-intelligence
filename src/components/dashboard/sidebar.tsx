import { Button } from "@/components/ui/button";

export function Sidebar() {
  return (
    <aside className="w-64 min-h-screen border-r p-6">
      <h2 className="text-xl font-bold">
        AI Lead Intelligence
      </h2>

      <nav className="mt-8 flex flex-col gap-2">
        <Button variant="ghost" className="justify-start">
          Dashboard
        </Button>

        <Button variant="ghost" className="justify-start">
          Analyze Lead
        </Button>

        <Button variant="ghost" className="justify-start">
          History
        </Button>

        <Button variant="ghost" className="justify-start">
          Settings
        </Button>
      </nav>
    </aside>
  );
}