import Stack from "@mui/system/Stack";
import Box from "@mui/system/Box";
import Grid from "@mui/system/Grid";
import { FilterSection, UserTable } from "./components";

function App() {
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Stack
        pt={2}
        spacing={2}
        direction="column"
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container spacing={3} size="auto" width={'100%'} px={10}>
          <Grid size={12}>
            <FilterSection />
          </Grid>
          <Grid size={12}>
            <UserTable />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}

export default App;
