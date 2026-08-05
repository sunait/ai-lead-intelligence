import { LeadAnalyzer } from "@/components/dashboard/lead-analyzer";

export default function DashboardPage() {
  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-3xl font-bold">
          Welcome back
        </h2>

        <p className="text-muted-foreground">
          Analyze companies using AI.
        </p>
      </div>


      <LeadAnalyzer />

    </div>
  );
}