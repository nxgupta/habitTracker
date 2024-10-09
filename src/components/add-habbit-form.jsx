import {useState} from "react"
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material"
import {useDispatch} from "react-redux"
import {addHabit} from "../store/habitSlice"
const AddHabitForm = () => {
  const [name, setName] = useState("")
  const [frequency, setFrequency] = useState("daily")
  let dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      addHabit({
        name,
        frequency,
      })
    )
    setName("")
  }
  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField label="Habit Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter habit name" fullWidth />
        <FormControl fullWidth>
          <InputLabel>Frequency</InputLabel>
          <Select value={frequency} label="Frequency" onChange={(e) => setFrequency(e.target.value)}>
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Add Habit
        </Button>
      </Box>
    </form>
  )
}

export default AddHabitForm
