import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between space-y-2">
      <h2 className="text-3xl font-bold tracking-tight">Fitness Dashboard</h2>
      <div className="flex items-center space-x-2">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Log Workout
        </Button>
      </div>
    </div>
  );
}