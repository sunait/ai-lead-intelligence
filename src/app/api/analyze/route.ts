import { NextResponse } from "next/server";
import { geminiModel } from "@/lib/gemini";


function isValidUrl(value: string) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}


export async function POST(request: Request) {
  try {

    const body = await request.json();


    if (!body || !body.url) {
      return NextResponse.json(
        {
          error: "Company URL is required."
        },
        {
          status: 400
        }
      );
    }


    let url = body.url.trim();


    // Add https if user enters only domain
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = `https://${url}`;
    }


    if (!isValidUrl(url)) {
      return NextResponse.json(
        {
          error: "Please enter a valid company URL."
        },
        {
          status: 400
        }
      );
    }



const prompt = `
You are an AI Sales Intelligence Assistant.

Analyze this company website:

${url}

Return ONLY valid JSON.

Use this structure:

{
  "companyName": "",
  "industry": "",
  "overview": "",
  "businessModel": "",
  "products": [],
  "targetCustomers": [],
  "painPoints": [],
  "salesOpportunities": [],
  "outreachStrategy": "",
  "coldEmailAngle": ""
}

Rules:
- Keep answers concise.
- Focus on sales intelligence.
- Do not use markdown.
- Do not include explanations outside JSON.
- Your entire response must start with { and end with }.
- Do not use markdown code blocks.
`;



let result;

try {
  result = await geminiModel.generateContent(prompt);
} catch (error: any) {

  console.error("Gemini generation failed:", error);


  if (error.status === 503) {
    return NextResponse.json(
      {
        error:
          "AI service is temporarily busy. Please try again in a few seconds."
      },
      {
        status: 503
      }
    );
  }


  throw error;
}

    const response = result.response.text();


    const jsonStart = response.indexOf("{");
    const jsonEnd = response.lastIndexOf("}") + 1;


    if (jsonStart === -1 || jsonEnd === 0) {
      throw new Error("Invalid JSON response from AI");
    }


    const cleanJson = response.substring(
      jsonStart,
      jsonEnd
    );


const analysis = JSON.parse(cleanJson);


    return NextResponse.json(
      {
        success: true,
        url,
        analysis
      },
      {
        status: 200
      }
    );


  } catch (error) {

    console.error("Gemini API error:", error);


    return NextResponse.json(
      {
        error: "Unable to analyze company. Please try again later."
      },
      {
        status: 500
      }
    );

  }
}