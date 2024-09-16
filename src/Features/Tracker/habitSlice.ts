import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface Habit {
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  completedDates: string[];
  createdAt: string;
}

interface HabitState {
  habits: Habit[];
  isLoading: boolean;
  error: string | null;
}

const initialState: HabitState = {
  habits: [],
  isLoading: false,
  error: null,
};

export const fetchHabits = createAsyncThunk("habits/fetchHabits", async () => {
  // Simulating an API Call
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const mockHabits: Habit[] = [
    {
      id: uuidv4(),
      name: "Read",
      frequency: "daily",
      completedDates: [],
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      name: "Exercise",
      frequency: "daily",
      completedDates: [],
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      name: "Long run",
      frequency: "weekly",
      completedDates: [],
      createdAt: new Date().toISOString(),
    },
  ];

  return mockHabits;
});

export const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addHabit: (
      state,
      action: PayloadAction<{ name: string; frequency: "daily" | "weekly" }>
    ) => {
      console.log("addHabit");
      const newHabit: Habit = {
        id: uuidv4(),
        name: action.payload.name,
        frequency: action.payload.frequency,
        completedDates: [],
        createdAt: new Date().toISOString(),
      };

      state.habits.push(newHabit);
    },
    toggleHabit: (
      state,
      action: PayloadAction<{ id: string; date: string }>
    ) => {
      const habit = state.habits.find((h) => h.id === action.payload.id);
      console.log("habit toggleHabit: ", habit);

      if (habit) {
        const index = habit.completedDates.indexOf(action.payload.date);
        console.log("index habit toggleHabit: ", index);

        if (index > -1) {
          habit.completedDates.splice(index, 1);
        } else {
          habit.completedDates.push(action.payload.date);
        }
      }
    },
    // removeHabit: (state, action: PayloadAction<{ id: string }>) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.isLoading = false;
        state.habits = action.payload;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch habits";
      });
  },
});

export const { addHabit, toggleHabit } = habitSlice.actions;

export default habitSlice.reducer;
