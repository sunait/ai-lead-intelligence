import {
  Loader2,
  Globe,
  Brain,
  Sparkles,
} from "lucide-react";


const steps = [
  {
    icon: Globe,
    text: "Fetching company website",
  },
  {
    icon: Brain,
    text: "Analyzing business information",
  },
  {
    icon: Sparkles,
    text: "Generating sales insights",
  },
];


export function LoadingAnalysis() {

  return (

    <div className="space-y-4 p-6 border rounded-xl bg-background">


      <div className="flex items-center gap-3">

        <Loader2
          className="animate-spin"
          size={22}
        />

        <h3 className="font-semibold">
          AI Analysis in progress
        </h3>

      </div>



      <div className="space-y-3">


        {steps.map((step) => {

          const Icon = step.icon;


          return (

            <div
              key={step.text}
              className="
                flex 
                items-center 
                gap-3
                text-sm
                text-muted-foreground
              "
            >

              <Icon size={18}/>

              {step.text}


            </div>

          );

        })}


      </div>


    </div>

  );
}