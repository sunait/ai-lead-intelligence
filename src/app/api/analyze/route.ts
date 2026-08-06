import { NextResponse } from "next/server";
import { geminiModel } from "@/lib/gemini";
import { scrapeCompanyWebsite } from "@/lib/scraper";


function isValidUrl(value: string) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}


// Gemini is instructed to return only JSON, but in practice sometimes
// adds a sentence before or after it (especially when it's unsure about
// a company it doesn't recognize). Rather than trust the model 100%,
// we defensively extract the first complete JSON object from the text.
function extractJsonFromAiResponse(response: string): any {

  // Best case: the model followed instructions exactly.
  try {
    return JSON.parse(response.trim());
  } catch {
    // fall through to manual extraction below
  }

  const jsonStart = response.indexOf("{");

  if (jsonStart === -1) {
    throw new Error("AI response did not contain a JSON object");
  }

  // Walk forward tracking brace depth so we find the matching closing
  // brace for the FIRST opening brace, instead of naively grabbing the
  // last "}" in the whole response (which breaks if there's trailing
  // text or a second object after the real one).
  let depth = 0;
  let jsonEnd = -1;

  for (let i = jsonStart; i < response.length; i++) {
    if (response[i] === "{") depth++;
    if (response[i] === "}") {
      depth--;
      if (depth === 0) {
        jsonEnd = i + 1;
        break;
      }
    }
  }

  if (jsonEnd === -1) {
    throw new Error("AI response contained an incomplete JSON object");
  }

  const cleanJson = response.substring(jsonStart, jsonEnd);

  return JSON.parse(cleanJson);
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



// Try to scrape the real website content first.
// If it fails, we fall back to letting Gemini use its own
// knowledge, but we tell the frontend so it can be transparent
// about it instead of pretending we read the live site.
const scraped = await scrapeCompanyWebsite(url);

let prompt: string;

if (scraped.success) {

  prompt = `
You are an AI Sales Intelligence Assistant.

Analyze this company based on the REAL content scraped from their website.

Company URL: ${url}
Page title: ${scraped.title || "N/A"}
Meta description: ${scraped.metaDescription || "N/A"}

Website content:
"""
${scraped.textContent}
"""

Base your analysis strictly on the content above. Do not invent facts
that aren't supported by it. If something isn't clear from the content,
make a reasonable inference and keep it general rather than fabricating
specifics.

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

} else {

  // Fallback: no scraped content available.
  prompt = `
You are an AI Sales Intelligence Assistant.

We were unable to fetch the live content of this company's website
(reason: ${scraped.error}), so base your analysis on general knowledge
about the company if you recognize it. If you don't recognize it,
clearly reflect that uncertainty in the "overview" field rather than
inventing specific facts.

Company URL: ${url}

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

}



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


    const analysis = extractJsonFromAiResponse(response);


    return NextResponse.json(
      {
        success: true,
        url,
        analysis,
        sourcedFromLiveContent: scraped.success
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