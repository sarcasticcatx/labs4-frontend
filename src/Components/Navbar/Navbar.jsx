import { AppBar, Box, Button, Container, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import HotelIcon from '@mui/icons-material/Hotel';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

const pages = [
  { name: 'Home', path: '/', icon: <HomeIcon /> },
  { name: 'All Accommodations', path: '/accommodation/all', icon: <HotelIcon /> },
  { name: 'Add New Accommodation', path: '/accommodation/accommodations', icon: <AddBusinessIcon /> },

];

function Navbar() {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "hotpink", boxShadow: "0 0 10px magenta" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              fontWeight: 700,
              color: 'white',
              textDecoration: 'none',
            }}
          >
            💖 Accommodations
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                startIcon={page.icon}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  textTransform: 'none',
                  fontWeight: 500
                }}
              >
                {page.name}
              </Button>
            ))}
            

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
