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

Analyze the following company website:

${url}

Create a professional business lead analysis.

Return the following information:

1. Company Overview
- What does the company do?
- Main business activities.

2. Industry
- Main industry and business category.

3. Business Model
- How does the company generate revenue?

4. Products and Services
- Main products or services offered.

5. Target Customers
- Who are their ideal customers?

6. Possible Business Pain Points
- What challenges could this company have?

7. Sales Opportunities
- What solutions, services or partnerships could be valuable?

8. Recommended Outreach Strategy
- How should a sales person approach this company?

9. Cold Email Angle
- Suggest a personalized opening message.

Keep the analysis concise, practical and focused on sales intelligence.
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


    return NextResponse.json(
      {
        success: true,
        url,
        analysis: response
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