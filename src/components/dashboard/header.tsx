import { Avatar, AvatarFallback } from "@/components/ui/avatar";


export function Header() {

  return (

    <header className="
      h-16 
      border-b 
      flex 
      items-center 
      justify-between 
      px-6
      bg-background
    ">


      <div>

        <h1 className="font-semibold">
          Dashboard
        </h1>

        <p className="text-sm text-muted-foreground">
          AI powered company analysis
        </p>

      </div>


      <Avatar>

        <AvatarFallback>
          AA
        </AvatarFallback>

      </Avatar>


    </header>

  );
}