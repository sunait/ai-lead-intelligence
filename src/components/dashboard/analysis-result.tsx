import {
  AlertTriangle,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


interface AnalysisData {
  companyName: string;
  industry: string;
  overview: string;
  businessModel: string;
  products: string[];
  targetCustomers: string[];
  painPoints: string[];
  salesOpportunities: string[];
  outreachStrategy: string;
  coldEmailAngle: string;
}


interface AnalysisResultProps {
  data: AnalysisData;
  url: string;
  sourcedFromLiveContent: boolean;
}


export function AnalysisResult({
  data,
  url,
  sourcedFromLiveContent,
}: AnalysisResultProps) {


  return (

    <div className="space-y-6">


      <Card>

        <CardHeader>

        <div className="flex items-start justify-between gap-3">

          <CardTitle className="text-2xl">
              {data.companyName}
          </CardTitle>

          {sourcedFromLiveContent ? (
            <Badge variant="secondary" className="gap-1 shrink-0">
              <Sparkles className="size-3" />
              Live website data
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="gap-1 shrink-0 text-amber-600 dark:text-amber-500"
            >
              <AlertTriangle className="size-3" />
              General knowledge
            </Badge>
          )}

        </div>


        <div className="flex gap-3 mt-2">

        <span className="
        rounded-full
        bg-muted
        px-3
        py-1
        text-sm
        ">
        🏷 {data.industry}
        </span>


        <span className="
        rounded-full
        bg-muted
        px-3
        py-1
        text-sm
        ">
        🌐 {url}
        </span>


        </div>

        </CardHeader>


        <CardContent>

          <p>
            {data.overview}
          </p>

        </CardContent>

      </Card>




      <div className="grid md:grid-cols-2 gap-6">


        <Card>

          <CardHeader>
            <CardTitle>
              Business Model
            </CardTitle>
          </CardHeader>

          <CardContent>
            {data.businessModel}
          </CardContent>

        </Card>




        <Card>

          <CardHeader>
            <CardTitle>
              Target Customers
            </CardTitle>
          </CardHeader>

          <CardContent>

            <ul className="space-y-2">

              {data.targetCustomers?.map(
                (item:string, index:number)=>(
                  <li key={index}>
                    • {item}
                  </li>
                )
              )}

            </ul>

          </CardContent>

        </Card>


      </div>





      <Card>

        <CardHeader>
          <CardTitle>
            Products & Services
          </CardTitle>
        </CardHeader>


        <CardContent>

          <div className="flex flex-wrap gap-2">

            {data.products?.map(
              (item:string, index:number)=>(
                <span
                  key={index}
                  className="
                  px-3
                  py-1
                  rounded-full
                  bg-muted
                  text-sm
                  "
                >
                  {item}
                </span>
              )
            )}

          </div>


        </CardContent>

      </Card>





      <Card>

        <CardHeader>
          <CardTitle>
            Sales Intelligence
          </CardTitle>
        </CardHeader>


        <CardContent className="space-y-4">


          <div>
            <h4 className="font-semibold">
              Pain Points
            </h4>

            <ul>

            {data.painPoints?.map(
              (item:string, index:number)=>(
                <li key={index}>
                  ⚠ {item}
                </li>
              )
            )}

            </ul>

          </div>



          <div>

            <h4 className="font-semibold">
              Opportunities
            </h4>


            <ul>

            {data.salesOpportunities?.map(
              (item:string, index:number)=>(
                <li key={index}>
                  🚀 {item}
                </li>
              )
            )}

            </ul>


          </div>


        </CardContent>

      </Card>





      <Card>

        <CardHeader>
          <CardTitle>
            Outreach Strategy
          </CardTitle>
        </CardHeader>


        <CardContent>

          <p>
            {data.outreachStrategy}
          </p>


          <br />


          <h4 className="font-semibold">
            Cold Email Angle
          </h4>


          <p>
            {data.coldEmailAngle}
          </p>


        </CardContent>

      </Card>


    </div>

  );
}