"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingAnalysis } from "@/components/dashboard/loading-analysis";
import { AnalysisResult } from "./analysis-result";
import { AnalysisError } from "./analysis-error";

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


export function LeadAnalyzer() {
  const [url, setUrl] = useState("");
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [sourcedFromLiveContent, setSourcedFromLiveContent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  async function handleAnalyze() {

    if (!url) {
      setError("Please enter a company URL.");
      return;
    }

    setLoading(true);
    setAnalysis(null);
    setError(null);

    try {

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          url,
        }),
      });


      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setAnalysis(null);
        return;
      }

      setAnalysis(data.analysis);
      setSourcedFromLiveContent(Boolean(data.sourcedFromLiveContent));


    } catch (error) {

      console.error(error);
      setError(
        "Could not reach the server. Check your connection and try again."
      );

    } finally {

      setLoading(false);

    }
  }


  return (
    <div className="
      space-y-6
      animate-in
      fade-in
      slide-in-from-bottom-4
      duration-500
    ">


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
            onChange={(e) =>
              setUrl(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) {
                handleAnalyze();
              }
            }}
          />


          <Button
            onClick={handleAnalyze}
            disabled={loading}
          >

            {loading
              ? "Analyzing..."
              : "Analyze"
            }

          </Button>


        </CardContent>

      </Card>


      {loading && (
        <LoadingAnalysis />
      )}


      {error && !loading && (
        <AnalysisError message={error} />
      )}


      {analysis && !loading && (

        <Card>

          <CardHeader>
            <CardTitle>
              AI Analysis Result
            </CardTitle>
          </CardHeader>


          <CardContent>

            <AnalysisResult 
              data={analysis}
              url={url}
              sourcedFromLiveContent={sourcedFromLiveContent}
            />

          </CardContent>


        </Card>

      )}


    </div>
  );
}