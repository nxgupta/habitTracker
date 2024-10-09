import {Box, Button, Grid, LinearProgress, Paper, Typography} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {removeHabit, toggleHabit} from "../store/habitSlice"
import DeleteIcon from "@mui/icons-material/Delete"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
const HabitList = () => {
  let {habits} = useSelector((state) => state.habits)
  const today = new Date().toISOString().split("T")[0]
  let dispatch = useDispatch()

  const getStreak = (habit) => {
    let streak = 0
    const currentDate = new Date()
    while (true) {
      const today = currentDate.toISOString().split("T")[0]
      if (habit.completedDates.includes(today)) {
        streak++
        currentDate.setDate(currentDate.getDate() - 1)
      } else {
        break
      }
    }

    return streak
  }

  return (
    <Box sx={{display: "flex", flexDirection: "column", gap: 2, mt: 4}}>
      {habits.map((habit) => {
        return (
          <Paper key={habit.id} elevation={2} sx={{p: 2}}>
            <Grid conatiner alignItems="center">
              <Grid xs={12} sm={6}>
                <Typography variant="h6">{habit.name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{textTransform: "capitalize"}}>
                  {habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1)}
                </Typography>
              </Grid>
              <Grid xs={12} sm={6}>
                <Box sx={{display: "flex", justifyContent: "flex-end", gap: 1}}>
                  <Button variant="outlined" color={habit?.completedDates?.includes(today) ? "success" : "primary"} onClick={() => dispatch(toggleHabit({id: habit.id, date: today}))} startIcon={<CheckCircleIcon />}>
                    {habit?.completedDates?.includes(today) ? "Completed" : "Mark Complete"}
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => dispatch(removeHabit({id: habit.id}))} startIcon={<DeleteIcon />}>
                    Remove
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{mt: 2}}>
              <Typography variant="body2">Current Streak: {getStreak(habit)} days</Typography>
              <LinearProgress variant="determinate" value={(getStreak(habit) / 30) * 100} sx={{mt: 1}} />
            </Box>
          </Paper>
        )
      })}
    </Box>
  )
}

export default HabitList
