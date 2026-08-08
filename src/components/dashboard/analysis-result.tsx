import {
  AlertTriangle,
  Sparkles,
  Building2,
  Globe,
  Users,
  Package,
  AlertCircle,
  TrendingUp,
  Mail,
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


      {/* Company header */}
      <Card>

        <CardHeader>

          <div className="flex items-start justify-between gap-4">

            <CardTitle className="text-3xl font-bold tracking-tight">
              {data.companyName}
            </CardTitle>

            {sourcedFromLiveContent ? (
              <Badge
                variant="secondary"
                className="h-7 gap-1.5 shrink-0 px-3 text-sm"
              >
                <Sparkles className="size-3.5" />
                Live website data
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="h-7 gap-1.5 shrink-0 px-3 text-sm text-amber-600 dark:text-amber-500"
              >
                <AlertTriangle className="size-3.5" />
                General knowledge
              </Badge>
            )}

          </div>


          <div className="flex flex-wrap gap-2.5 mt-3">

            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary">
              <Building2 className="size-3.5" />
              {data.industry}
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3.5 py-1.5 text-sm text-muted-foreground">
              <Globe className="size-3.5" />
              {url}
            </span>

          </div>

        </CardHeader>


        <CardContent>

          <p className="text-base leading-relaxed text-foreground/90">
            {data.overview}
          </p>

        </CardContent>

      </Card>


      {/* Business model + target customers */}
      <div className="grid md:grid-cols-2 gap-4">


        <Card>

          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Building2 className="size-5 text-primary" />
              Business Model
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-base leading-relaxed">
              {data.businessModel}
            </p>
          </CardContent>

        </Card>


        <Card>

          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="size-5 text-primary" />
              Target Customers
            </CardTitle>
          </CardHeader>

          <CardContent>

            <ul className="space-y-2.5">

              {data.targetCustomers?.map(
                (item: string, index: number) => (
                  <li key={index} className="flex items-start gap-2.5 text-base">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                )
              )}

            </ul>

          </CardContent>

        </Card>


      </div>


      {/* Products */}
      <Card>

        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Package className="size-5 text-primary" />
            Products & Services
          </CardTitle>
        </CardHeader>


        <CardContent>

          <div className="flex flex-wrap gap-2.5">

            {data.products?.map(
              (item: string, index: number) => (
                <span
                  key={index}
                  className="rounded-full bg-muted px-4 py-2 text-sm font-medium"
                >
                  {item}
                </span>
              )
            )}

          </div>

        </CardContent>

      </Card>


      {/* Pain points + opportunities */}
      <div className="grid md:grid-cols-2 gap-4">

        <Card className="border-amber-500/20 bg-amber-500/[0.03]">

          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-amber-700 dark:text-amber-500">
              <AlertCircle className="size-5" />
              Pain Points
            </CardTitle>
          </CardHeader>

          <CardContent>

            <ul className="space-y-2.5">

              {data.painPoints?.map(
                (item: string, index: number) => (
                  <li key={index} className="flex items-start gap-2.5 text-base">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-500" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                )
              )}

            </ul>

          </CardContent>

        </Card>


        <Card className="border-emerald-500/20 bg-emerald-500/[0.03]">

          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-emerald-700 dark:text-emerald-500">
              <TrendingUp className="size-5" />
              Sales Opportunities
            </CardTitle>
          </CardHeader>

          <CardContent>

            <ul className="space-y-2.5">

              {data.salesOpportunities?.map(
                (item: string, index: number) => (
                  <li key={index} className="flex items-start gap-2.5 text-base">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-500" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                )
              )}

            </ul>

          </CardContent>

        </Card>

      </div>


      {/* Outreach */}
      <Card>

        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Mail className="size-5 text-primary" />
            Outreach Strategy
          </CardTitle>
        </CardHeader>


        <CardContent className="space-y-5">

          <p className="text-base leading-relaxed">
            {data.outreachStrategy}
          </p>

          <div className="space-y-2">

            <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Cold Email Angle
            </h4>

            <p className="rounded-xl bg-muted/60 p-4 text-base leading-relaxed">
              {data.coldEmailAngle}
            </p>

          </div>

        </CardContent>

      </Card>


    </div>

  );
}