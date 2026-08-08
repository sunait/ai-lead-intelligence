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
      bg-background/80
      backdrop-blur-sm
      sticky
      top-0
      z-10
    ">


      <div>

        <h1 className="font-semibold">
          Dashboard
        </h1>

        <p className="text-sm text-muted-foreground">
          AI powered company analysis
        </p>

      </div>


      <Avatar className="ring-2 ring-primary/10">

        <AvatarFallback className="bg-primary/10 text-primary font-medium">
          AA
        </AvatarFallback>

      </Avatar>


    </header>

  );
}