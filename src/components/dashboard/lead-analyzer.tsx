"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function LeadAnalyzer() {
  const [url, setUrl] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  function handleAnalyze() {
    setAnalyzed(true);
  }

  return (
    <div className="space-y-6">

      <Card>
        <CardHeader>
          <CardTitle>
            Analyze New Company
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          <Input
            placeholder="https://company.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <Button onClick={handleAnalyze}>
            Analyze
          </Button>

        </CardContent>
      </Card>


      {analyzed && (
        <Card>
          <CardHeader>
            <CardTitle>
              AI Analysis Result
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">

            <p>
              <strong>Company:</strong> Example Company
            </p>

            <p>
              <strong>Industry:</strong> Technology
            </p>

            <p>
              <strong>Score:</strong> 85/100
            </p>

            <p>
              <strong>Recommendation:</strong> Good potential lead.
            </p>

          </CardContent>
        </Card>
      )}

    </div>
  );
}