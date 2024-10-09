import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

const initialState = {
  habits: [],
  isLoading: false,
  error: null,
}

export const fetchHabits = createAsyncThunk("habits/fetchHabits", async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/todos/5")
  console.log(await data.json())
  let today = new Date()
  let customData = [
    {
      id: "1728505646096",
      name: "Read book",
      frequency: "daily",
      completedDates: [today.toISOString().split("T")[0]],
      createAt: "2024-10-09T20:27:26.096Z",
    },
    {
      id: "1728505652784",
      name: "Run",
      frequency: "weekly",
      completedDates: [today.toISOString().split("T")[0]],
      createAt: "2024-10-09T20:27:32.784Z",
    },
  ]
  return customData
})

let habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addHabit: (state, action) => {
      const newHabit = {
        id: Date.now().toString(),
        name: action.payload.name,
        frequency: action.payload.frequency,
        completedDates: [],
        createAt: new Date().toISOString(),
      }
      state.habits.push(newHabit)
    },
    removeHabit: (state, action) => {
      console.log(action)
      let filteredHabits = state.habits.filter((h) => h.id !== action.payload.id)
      state.habits = filteredHabits
    },
    toggleHabit: (state, action) => {
      const habit = state.habits.find((h) => h.id === action.payload.id)
      if (habit) {
        const index = habit.completedDates.indexOf(action.payload.date)
        if (index > -1) {
          habit.completedDates.splice(index, 1)
        } else {
          habit.completedDates.push(action.payload.date)
        }
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.isLoading = false
        state.habits = action.payload
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.isLoading = false
        state.error = action?.error?.message || "Failed to fetch habits"
      })
  },
})

export const {addHabit, removeHabit, toggleHabit} = habitSlice.actions

export default habitSlice.reducer
