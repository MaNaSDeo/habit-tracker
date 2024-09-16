import { Container, Typography } from "@mui/material";
import AddHabitForm from "./Components/AddHabitForm";
import HabitList from "./Components/HabitList";

function App() {
  return (
    <Container maxWidth="md">
      <Typography component="h1" variant="h2" align="center">
        Habit Tracker
      </Typography>
      <AddHabitForm />
      <HabitList />
    </Container>
  );
}

export default App;
