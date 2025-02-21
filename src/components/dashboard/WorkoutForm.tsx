import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Trash2, ChevronRight, ChevronLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  weight: string;
  unit: string;
}

interface WorkoutFormData {
  name: string;
  date: string;
  duration: string;
  exercises: Exercise[];
  notes: string;
}

export function WorkoutForm() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<WorkoutFormData>({
    name: "",
    date: new Date().toISOString().split("T")[0],
    duration: "",
    exercises: [{ name: "", sets: "", reps: "", weight: "", unit: "lbs" }],
    notes: "",
  });

  const addExercise = () => {
    setFormData({
      ...formData,
      exercises: [
        ...formData.exercises,
        { name: "", sets: "", reps: "", weight: "", unit: "lbs" },
      ],
    });
  };

  const removeExercise = (index: number) => {
    setFormData({
      ...formData,
      exercises: formData.exercises.filter((_, i) => i !== index),
    });
  };

  const updateExercise = (index: number, field: keyof Exercise, value: string) => {
    const newExercises = [...formData.exercises];
    newExercises[index] = { ...newExercises[index], [field]: value };
    setFormData({ ...formData, exercises: newExercises });
  };

  const handleSubmit = () => {
    // Here we'll add the actual submission logic later
    toast({
      title: "Workout Logged Successfully!",
      description: "Your workout has been recorded.",
    });
    // Close the dialog by triggering the close button
    const closeButton = document.querySelector('[aria-label="Close"]');
    if (closeButton instanceof HTMLButtonElement) {
      closeButton.click();
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name && formData.date && formData.duration;
      case 2:
        return formData.exercises.every(
          (ex) => ex.name && ex.sets && ex.reps && ex.weight
        );
      case 3:
        return true; // Notes are optional
      default:
        return false;
    }
  };

  return (
    <div className="space-y-6 py-4">
      {/* Step indicator */}
      <div className="flex justify-center space-x-2 mb-6">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className={`h-2 w-2 rounded-full ${
              i === step ? "bg-primary" : "bg-muted"
            }`}
            animate={{
              scale: i === step ? 1.2 : 1,
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Workout Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., Full Body Strength"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  placeholder="e.g., 60"
                />
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            {formData.exercises.map((exercise, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="grid gap-4 p-4 border rounded-lg relative"
              >
                <div className="absolute right-2 top-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeExercise(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Exercise Name</Label>
                    <Input
                      value={exercise.name}
                      onChange={(e) =>
                        updateExercise(index, "name", e.target.value)
                      }
                      placeholder="e.g., Bench Press"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Sets</Label>
                    <Input
                      value={exercise.sets}
                      onChange={(e) =>
                        updateExercise(index, "sets", e.target.value)
                      }
                      placeholder="e.g., 3"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Reps</Label>
                    <Input
                      value={exercise.reps}
                      onChange={(e) =>
                        updateExercise(index, "reps", e.target.value)
                      }
                      placeholder="e.g., 10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Weight</Label>
                    <div className="flex space-x-2">
                      <Input
                        value={exercise.weight}
                        onChange={(e) =>
                          updateExercise(index, "weight", e.target.value)
                        }
                        placeholder="e.g., 135"
                      />
                      <Select
                        value={exercise.unit}
                        onValueChange={(value) =>
                          updateExercise(index, "unit", value)
                        }
                      >
                        <SelectTrigger className="w-[100px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lbs">lbs</SelectItem>
                          <SelectItem value="kg">kg</SelectItem>
                          <SelectItem value="bw">BW</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={addExercise}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Exercise
            </Button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Add any notes about your workout..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={() => setStep(step - 1)}
          disabled={step === 1}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={() => {
            if (step === 3) {
              handleSubmit();
            } else {
              setStep(step + 1);
            }
          }}
          disabled={!isStepValid()}
        >
          {step === 3 ? (
            "Save Workout"
          ) : (
            <>
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}