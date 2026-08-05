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
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleAnalyze() {

    if (!url) return;

    setLoading(true);
    setAnalysis("");

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

      setAnalysis(data.analysis);


    } catch (error) {

      console.error(error);

      setAnalysis(
        "Something went wrong."
      );

    } finally {

      setLoading(false);

    }
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
            onChange={(e) =>
              setUrl(e.target.value)
            }
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



      {analysis && (

        <Card>

          <CardHeader>
            <CardTitle>
              AI Analysis Result
            </CardTitle>
          </CardHeader>


          <CardContent>

            <p className="whitespace-pre-wrap">
              {analysis}
            </p>

          </CardContent>


        </Card>

      )}


    </div>
  );
}