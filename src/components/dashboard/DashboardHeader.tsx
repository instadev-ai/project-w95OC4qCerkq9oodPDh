import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import { WorkoutForm } from "./WorkoutForm";

export function DashboardHeader() {
  return (
    <motion.div 
      className="flex items-center justify-between space-y-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-3xl font-bold tracking-tight"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Fitness Dashboard
      </motion.h2>
      <motion.div 
        className="flex items-center space-x-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Log Workout
              </motion.div>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Log New Workout</DialogTitle>
              <DialogDescription>
                Record your workout details. Track your progress and celebrate your achievements.
              </DialogDescription>
            </DialogHeader>
            <WorkoutForm />
          </DialogContent>
        </Dialog>
      </motion.div>
    </motion.div>
  );
}