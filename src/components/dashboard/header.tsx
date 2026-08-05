import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Header() {
  return (
    <header className="h-16 border-b flex items-center justify-between px-6">
      <h1 className="font-semibold">
        Dashboard
      </h1>

      <Avatar>
        <AvatarFallback>
          AA
        </AvatarFallback>
      </Avatar>
    </header>
  );
}