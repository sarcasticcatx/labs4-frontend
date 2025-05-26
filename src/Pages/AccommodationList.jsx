import { Container, Typography, CardMedia, Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { accommodationRepo } from "../repository/accommodationRepo";
import AccommodationCard from "../Components/Cards/AccommodationCard";

export default function AccommodationList() {
    const [accommodations, setAccommodations] = useState([]);
    const [setError] = useState('');

    useEffect(() => {
        accommodationRepo
            .findAll()
            .then((response) => {
                setAccommodations(response.data);
            })
            .catch(err => {
                console.error(err);
                setError('Failed to load accommodations.');
            });
    }, []);

    return (
  <Container sx={{ mt: 20 }}> 
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
        backgroundColor: "lightpink",
        px: 2,
        py: 1,
        borderRadius: 1,
      }}
    >
       <Grid container spacing={3}>
      {accommodations.map((accommodation) => (
        <Grid item key={accommodation.id} xs={12} sm={7} md={5}>
          <AccommodationCard accommodation={accommodation} />
        </Grid>
      ))}
    </Grid>

    </Box>
  </Container>
)
};

