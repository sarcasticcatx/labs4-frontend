import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CardMedia,
  CircularProgress,
  Button,
  Stack,
  Box,
} from "@mui/material";
import {accommodationRepo} from "../repository/accommodationRepo";

export default function AccommodationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [accommodation, setAccommodation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    accommodationRepo
      .findById(id)
      .then((res) => {
        setAccommodation(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Accommodation not found or failed to fetch.");
        setLoading(false);
      });
  }, [id]);
// smeniv tuka accommodations vo accommodation
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this accommodation?")) {
      try {
        await accommodationRepo.deleteById(id);
        navigate("/accommodation/all");
      } catch (err) {
        console.error("Delete failed", err);
        setError("Failed to delete the accommodation.");
      }
    }
  };

  const handleReserve = async () => {
    console.log("Reserve clicked")
  try {
    await accommodationRepo.addTempReservation({
      accommodation_id: accommodation.id,
      user_id: 1
    });
    navigate('/accommodation/temp-reservation');
  } catch (err) {
    console.error("Reserve failed", err);
    setError("Failed to add temporary reservation.");
  }
};

  if (loading) {
    return (
      <Container sx={{ mt: 10, textAlign: "center" }}>
        <CircularProgress color="secondary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 20 }}>
        <Typography variant="h5" color="error">
          {error}
        </Typography>
        <Button variant="outlined" component={Link} to="/accommodation/all" sx={{ mt: 2 }}>
          Back to List
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 20 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          background: "linear-gradient(to right, #ff69b4, #ffb6c1)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: "bold",
        }}
      >
        {accommodation.name}
      </Typography>

      <CardMedia
        component="img"
        height="300"
        image={accommodation.image || "/default-glam.jpg"}
        alt={accommodation.name}
        sx={{ borderRadius: 3, boxShadow: "0 0 20px pink", my: 2 }}
      />

      <Typography
        variant="h6"
        sx={{
          backgroundColor: "#ffe4e1",
          padding: 2,
          borderRadius: 2,
          boxShadow: "0 0 10px #ffb6c1",
        }}
      >
        {accommodation.description}
      </Typography>

      <Typography sx={{ mt: 2 }}>Available: {accommodation.isAvailable ? "Yes" : "No"}</Typography>
      <Typography>Rooms: {accommodation.numRooms}</Typography>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Button variant="outlined" component={Link} to="/accommodation/all">
          Back to List
        </Button>

       <Stack direction="row" spacing={2}>
   <Button
            variant="contained"
            sx={{ backgroundColor: "#f06292", color: "white" }}
            onClick={handleReserve}
          >
            Reserve
          </Button>
  <Button
  type="button"
    variant="contained"
    color="secondary"
    component={Link}
    to={`/accommodation/edit/${accommodation.id}`}
    sx={{ background: "#ff69b4" }}
  >
    Edit
  </Button>
  <Button variant="outlined" color="error" onClick={handleDelete}>
    Delete
  </Button>
</Stack>
      </Box>
    </Container>
  );
}
