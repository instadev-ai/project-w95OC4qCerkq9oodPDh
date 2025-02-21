import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function ProgressCharts() {
  const strengthData = [
    { date: "Week 1", squat: 225, bench: 185, deadlift: 275 },
    { date: "Week 2", squat: 235, bench: 190, deadlift: 285 },
    { date: "Week 3", squat: 245, bench: 195, deadlift: 295 },
    { date: "Week 4", squat: 255, bench: 200, deadlift: 305 },
    { date: "Week 5", squat: 265, bench: 215, deadlift: 315 },
  ];

  const volumeData = [
    { date: "Week 1", volume: 12000 },
    { date: "Week 2", volume: 15000 },
    { date: "Week 3", volume: 13500 },
    { date: "Week 4", volume: 16000 },
    { date: "Week 5", volume: 17500 },
  ];

  return (
    <Tabs defaultValue="strength" className="space-y-4">
      <TabsList>
        <TabsTrigger value="strength">Strength Progress</TabsTrigger>
        <TabsTrigger value="volume">Volume Progress</TabsTrigger>
      </TabsList>

      <TabsContent value="strength">
        <Card>
          <CardHeader>
            <CardTitle>Main Lifts Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={strengthData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis
                    dataKey="date"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}lbs`}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="squat"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={false}
                    name="Squat"
                  />
                  <Line
                    type="monotone"
                    dataKey="bench"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    dot={false}
                    name="Bench"
                  />
                  <Line
                    type="monotone"
                    dataKey="deadlift"
                    stroke="#ffc658"
                    strokeWidth={2}
                    dot={false}
                    name="Deadlift"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="volume">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Volume (Total Weight × Reps)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={volumeData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis
                    dataKey="date"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}lbs`}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="volume"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={false}
                    name="Volume"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}