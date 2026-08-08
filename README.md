# Lead Intelligence — Sales AI Platform

An AI-powered sales intelligence tool that analyzes any company from its website URL and generates a structured sales brief: industry, business model, target customers, pain points, sales opportunities, and a ready-to-use cold outreach angle.

Built as a portfolio project to demonstrate practical, production-minded use of LLM APIs — not just calling a model, but handling the failure modes that come with relying on one.

## Live Demo

[Add your Vercel URL here after deployment]

## Features

- **Real website analysis, not guesswork** — scrapes the target company's homepage (title, meta description, visible text) and feeds that content directly to the AI, instead of relying purely on what the model already "knows" about a brand.
- **Transparent fallback** — if a site can't be scraped (blocks bots, times out, doesn't exist), the app falls back to the model's general knowledge and clearly labels the result as such with a "General knowledge" badge, instead of pretending it read a live page.
- **Structured sales output** — industry, business model, products, target customers, pain points, sales opportunities, an outreach strategy, and a cold email angle, all in one consistent format.
- **Resilient error handling** — network failures, AI service downtime, and malformed AI responses are each detected and surfaced with a specific, human-readable message instead of a generic crash.
- **Clean, readable UI** — dashboard layout with distinct visual treatment for opportunities (green) vs. pain points (amber), and a clear signal for how trustworthy each result is.

## How It Works

```
Company URL
     │
     ▼
┌─────────────────┐
│  Scraper         │  fetch + Cheerio → title, meta description,
│  (src/lib/       │  visible text (timeout-protected, 8s max)
│   scraper.ts)    │
└────────┬─────────┘
         │
   success?
    ┌────┴────┐
   yes        no
    │          │
    ▼          ▼
"Analyze using   "Analyze using general
 this real       knowledge, and say so
 content"        if you're not sure"
    │          │
    └────┬─────┘
         ▼
┌─────────────────┐
│  Gemini 3.5      │  structured JSON output
│  Flash           │  (companyName, industry, painPoints, ...)
└────────┬─────────┘
         │
         ▼
┌─────────────────┐
│  JSON extraction │  defensive parser — handles cases where
│  (route.ts)      │  the model adds text before/after the JSON
└────────┬─────────┘
         │
         ▼
   Dashboard UI
   (badge shows whether the result is based on
   live website content or general knowledge)
```

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **AI:** Google Gemini API (`gemini-3.5-flash`, structured JSON output)
- **Scraping:** Cheerio (server-side HTML parsing)
- **Icons:** Lucide React
- **Deployment:** Vercel

## Installation

```bash
git clone https://github.com/sunait/ai-lead-intelligence.git
cd ai-lead-intelligence
npm install
```

Create a `.env.local` file in the project root:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

Get a free API key at [aistudio.google.com](https://aistudio.google.com/apikey).

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects straight to the dashboard.

## Screenshots

*(Add screenshots here: empty state, loading state, successful analysis, error state)*

## What I Learned

- **Working with LLM APIs in production, not just a notebook.** Prompting Gemini for structured JSON output is easy in the happy path; handling the model when it adds explanatory text around the JSON, or is genuinely unsure about an answer, took more care than the initial implementation.
- **Defensive JSON parsing.** An early version used `indexOf("{")` / `lastIndexOf("}")` to extract JSON from the AI response. That broke as soon as the model added a sentence after the JSON object (which happens more often than expected when the model is uncertain about a company it doesn't recognize). Replaced it with a brace-depth-tracking parser that finds the first *complete* JSON object regardless of surrounding text.
- **Designing for AI uncertainty instead of hiding it.** Rather than letting the model silently hallucinate details about a company it can't verify, the app scrapes real content when possible and explicitly labels results that fall back to general knowledge — so the user knows how much to trust what they're looking at.
- **Distinguishing failure types.** Not all errors are the same: an invalid URL, an AI service outage, and a network failure on the server all need different messages. Early versions collapsed these into one generic "something went wrong" — later versions detect and surface the actual cause (e.g. `fetch failed` from a network-level issue vs. a 503 from Gemini being temporarily overloaded).
- **Prompt engineering under time pressure.** Iterating on the prompt's `Rules` section (e.g. explicitly instructing the model to start and end its response with `{` / `}`, and to reflect uncertainty in the `overview` field rather than inventing facts) made a measurable difference in output reliability.
- **AI-assisted development, used deliberately.** This project was built with the help of AI coding tools (Claude, Gemini). Every non-trivial change was tested manually against real inputs (working sites, non-existent domains, sites that block bots, and a simulated network outage) before being committed — the goal was to understand and be able to explain every part of the code, not just to have it work.

## Known Limitations & Future Roadmap

Built under a tight timeline with deliberate scope cuts. Documented here rather than hidden:

- **No persistence.** Search history isn't saved yet — each analysis is a one-off. Planned: Supabase table to store past searches, no auth required for v1.
- **No authentication.** Single-user, no accounts. Would be required before this could be a real multi-tenant product.
- **Scraping is homepage-only.** Doesn't yet follow links to an `/about` or `/products` page, which would improve analysis quality for companies with thin homepage content.
- **No automated tests.** Given the timeline, testing was manual and scenario-based (documented above) rather than automated. Would add API route tests (mocking the Gemini client and scraper) as a next step.

## Related Projects

Part of a small suite of AI/automation portfolio projects:
- **Lead Intelligence** (this project) — AI-powered company research and outreach
- **AI Knowledge Assistant** — RAG-based document Q&A
- **AI Workflow Automation** — n8n + Docker based automation pipeline