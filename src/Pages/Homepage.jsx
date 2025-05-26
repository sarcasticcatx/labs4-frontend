
import { Box, Container, Typography } from "@mui/material";
import Navbar from "../Components/Navbar/Navbar";

export default function Homepage() {
  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Navbar />
      </Box>
    </Container>
  );
}
