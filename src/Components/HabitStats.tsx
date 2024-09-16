import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Features/Tracker/store";
import { fetchHabits, Habit } from "../Features/Tracker/habitSlice";
import { LinearProgress, Paper, Typography } from "@mui/material";

const HabitStats: FC = () => {
  const { habits, isLoading, error } = useSelector(
    (state: RootState) => state.habits
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchHabits());
  }, []);

  const getCompletedToday = (): number => {
    const today = new Date().toISOString().split("T")[0];

    return habits.filter((habit) => habit.completedDates.includes(today))
      .length;
  };

  const getLongestStreak = (): number => {
    return Math.max(...habits.map(getStreak), 0);
  };

  const getStreak = (habit: Habit) => {
    let streak = 0;
    const currentDate = new Date();

    console.log("currentDate", currentDate);

    while (true) {
      const dateString = currentDate.toISOString().split("T")[0];
      console.log({
        dateString,
        prevDate: currentDate.setDate(currentDate.getDate() - 1),
        dateArray: habit.completedDates,
      });

      if (habit.completedDates.includes(dateString)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  console.log({ habits, isLoading, error });
  if (isLoading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Paper elevation={2} sx={{ p: 2, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Habit Statistics
      </Typography>
      <Typography variant="body1">Total Habits: {habits.length}</Typography>
      <Typography variant="body1">
        Completed Today: {getCompletedToday()}
      </Typography>
      <Typography variant="body1">
        Longest Streak: {getLongestStreak()}
      </Typography>
    </Paper>
  );
};

export default HabitStats;
