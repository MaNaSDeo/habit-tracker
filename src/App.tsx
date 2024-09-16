import { Container, Typography } from "@mui/material";
import AddHabitForm from "./Components/AddHabitForm";

function App() {
  return (
    <Container maxWidth="md">
      <Typography component="h1" variant="h2" align="center">
        Habit Tracker
      </Typography>
      <AddHabitForm />
    </Container>
  );
}

export default App;
