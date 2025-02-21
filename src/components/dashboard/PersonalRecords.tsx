import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trophy } from "lucide-react";
import { motion } from "framer-motion";

interface PersonalRecordsProps {
  detailed?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    x: -20
  },
  visible: { 
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

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
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {records.map((record, i) => (
          <motion.div 
            key={i}
            variants={itemVariants}
            className="flex items-start gap-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div 
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Trophy className="h-4 w-4 text-primary" />
            </motion.div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{record.exercise}</span>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Badge variant="secondary" className="rounded-sm">
                    {record.category}
                  </Badge>
                </motion.div>
              </div>
              <motion.p 
                className="text-2xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
              >
                {record.weight} {record.unit || "lbs"}
              </motion.p>
              {detailed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3, delay: 0.3 + (i * 0.1) }}
                >
                  <p className="text-sm text-muted-foreground">
                    Previous: {record.previousRecord} {record.unit || "lbs"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Achieved: {new Date(record.date).toLocaleDateString()}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </ScrollArea>
  );
}