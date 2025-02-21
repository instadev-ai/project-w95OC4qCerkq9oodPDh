import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trophy } from "lucide-react";

interface PersonalRecordsProps {
  detailed?: boolean;
}

export function PersonalRecords({ detailed = false }: PersonalRecordsProps) {
  const records = [
    {
      exercise: "Deadlift",
      weight: "315",
      date: "2024-02-20",
      previousRecord: "305",
      category: "Lower Body",
    },
    {
      exercise: "Bench Press",
      weight: "225",
      date: "2024-02-15",
      previousRecord: "215",
      category: "Upper Body",
    },
    {
      exercise: "Squat",
      weight: "275",
      date: "2024-02-10",
      previousRecord: "265",
      category: "Lower Body",
    },
    {
      exercise: "Overhead Press",
      weight: "135",
      date: "2024-02-05",
      previousRecord: "130",
      category: "Upper Body",
    },
    {
      exercise: "Pull-ups",
      weight: "15",
      date: "2024-02-01",
      previousRecord: "12",
      category: "Upper Body",
      unit: "reps",
    },
  ];

  return (
    <ScrollArea className={detailed ? "h-[500px]" : "h-[300px]"}>
      <div className="space-y-6">
        {records.map((record, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <Trophy className="h-4 w-4 text-primary" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{record.exercise}</span>
                <Badge variant="secondary" className="rounded-sm">
                  {record.category}
                </Badge>
              </div>
              <p className="text-2xl font-bold">
                {record.weight} {record.unit || "lbs"}
              </p>
              {detailed && (
                <>
                  <p className="text-sm text-muted-foreground">
                    Previous: {record.previousRecord} {record.unit || "lbs"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Achieved: {new Date(record.date).toLocaleDateString()}
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}