import { AlertCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


interface AnalysisErrorProps {
  message: string;
}


export function AnalysisError({ message }: AnalysisErrorProps) {
  return (
    <Card className="border-destructive/30 bg-destructive/5">

      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base text-destructive">
          <AlertCircle className="size-4" />
          Analysis failed
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">
          {message}
        </p>
      </CardContent>

    </Card>
  );
}