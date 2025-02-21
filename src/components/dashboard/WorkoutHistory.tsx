import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

interface WorkoutHistoryProps {
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

export function WorkoutHistory({ detailed = false }: WorkoutHistoryProps) {
  const workouts = [
    {
      date: "2024-02-20",
      name: "Full Body Strength",
      duration: "65 min",
      exercises: [
        { name: "Bench Press", sets: "3x5", weight: "185 lbs" },
        { name: "Squats", sets: "3x5", weight: "225 lbs" },
        { name: "Deadlift", sets: "1x5", weight: "315 lbs" },
      ],
    },
    {
      date: "2024-02-18",
      name: "Upper Body Focus",
      duration: "45 min",
      exercises: [
        { name: "Pull-ups", sets: "3x8", weight: "BW" },
        { name: "Overhead Press", sets: "3x8", weight: "95 lbs" },
        { name: "Rows", sets: "3x10", weight: "135 lbs" },
      ],
    },
    {
      date: "2024-02-16",
      name: "Lower Body Power",
      duration: "50 min",
      exercises: [
        { name: "Front Squats", sets: "4x6", weight: "185 lbs" },
        { name: "Romanian Deadlift", sets: "3x8", weight: "225 lbs" },
        { name: "Leg Press", sets: "3x10", weight: "360 lbs" },
      ],
    },
  ];

  return (
    <ScrollArea className="h-[350px] pr-4">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {workouts.map((workout, i) => (
          <motion.div 
            key={i} 
            variants={itemVariants}
            className="flex"
          >
            <div className="flex w-[80px] flex-col items-center">
              <motion.div 
                className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-sm font-bold"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {new Date(workout.date).getDate()}
              </motion.div>
              {i !== workouts.length - 1 && (
                <div className="h-full w-px bg-border" />
              )}
            </div>
            <motion.div 
              className="flex-1 pb-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold">{workout.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {workout.duration}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date(workout.date).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
              
              {detailed && (
                <motion.div 
                  className="mt-4 grid gap-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  {workout.exercises.map((exercise, j) => (
                    <motion.div
                      key={j}
                      className="grid grid-cols-3 text-sm text-muted-foreground"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + (j * 0.1) }}
                    >
                      <span>{exercise.name}</span>
                      <span>{exercise.sets}</span>
                      <span>{exercise.weight}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </ScrollArea>
  );
}