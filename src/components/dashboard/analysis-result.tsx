import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


interface AnalysisResultProps {
  data: any;
  url:string;
}


export function AnalysisResult({
  data,
  url,
}: AnalysisResultProps) {


  return (

    <div className="space-y-6">


      <Card>

        <CardHeader>

        <CardTitle className="text-2xl">
            {data.companyName}
        </CardTitle>


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
        🌐 {data.url}
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
                (item:string)=>(
                  <li key={item}>
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
              (item:string)=>(
                <span
                  key={item}
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
              (item:string)=>(
                <li key={item}>
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
              (item:string)=>(
                <li key={item}>
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