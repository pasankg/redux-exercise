import Stack from "@mui/system/Stack";
import Box from "@mui/system/Box";
import Grid from "@mui/system/Grid";
import { FilterSection, UserTable } from "./components";

function App() {
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Stack
        spacing={2}
        direction="column"
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2} size="auto">
          <Grid size={12}>
            <FilterSection />
          </Grid>
          <hr />
          <Grid size={12}>
            <UserTable />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}

export default App;
