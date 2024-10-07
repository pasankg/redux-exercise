import Stack from "@mui/system/Stack";
import { UserTable } from "./components";

function App() {
  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <UserTable />
    </Stack>
  );
}

export default App;
