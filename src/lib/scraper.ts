import * as cheerio from "cheerio";

export interface ScrapedContent {
  success: boolean;
  title?: string;
  metaDescription?: string;
  textContent?: string;
  error?: string;
}

const FETCH_TIMEOUT_MS = 8000;
const MAX_TEXT_LENGTH = 6000; // keep prompt size sane and cheap

export async function scrapeCompanyWebsite(
  url: string
): Promise<ScrapedContent> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      FETCH_TIMEOUT_MS
    );

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        // Some sites block requests with no/blank UA
        "User-Agent":
          "Mozilla/5.0 (compatible; AILeadIntelligenceBot/1.0; +https://github.com/sunait/ai-lead-intelligence)",
      },
      redirect: "follow",
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return {
        success: false,
        error: `Website responded with status ${response.status}`,
      };
    }

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) {
      return {
        success: false,
        error: "URL did not return an HTML page",
      };
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Strip elements that add noise, not signal
    $("script, style, noscript, svg, iframe, nav, footer").remove();

    const title = $("title").first().text().trim();

    const metaDescription =
      $('meta[name="description"]').attr("content")?.trim() ||
      $('meta[property="og:description"]').attr("content")?.trim() ||
      "";

    // Grab visible text from body, collapse whitespace
    const bodyText = $("body")
      .text()
      .replace(/\s+/g, " ")
      .trim();

    const textContent = bodyText.slice(0, MAX_TEXT_LENGTH);

    if (!textContent || textContent.length < 50) {
      return {
        success: false,
        error: "Page returned little or no readable text content",
      };
    }

    return {
      success: true,
      title,
      metaDescription,
      textContent,
    };
  } catch (error: any) {
    if (error.name === "AbortError") {
      return {
        success: false,
        error: "Website took too long to respond",
      };
    }

    return {
      success: false,
      error: "Could not reach the website",
    };
  }
}