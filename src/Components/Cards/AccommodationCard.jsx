import {
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";



export default function AccommodationCard({ accommodation }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        backgroundColor: "mistyrose",
        boxShadow: "0 0 10px pink",
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {accommodation.name}
        </Typography>

        <Typography
          variant="body2"
          color={accommodation.isAvailable ? "green" : "red"}
        >
          {accommodation.isAvailable ? "Available" : "Not Available"}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Rooms: {accommodation.numRooms}
        </Typography>

        {accommodation.category && (
          <Typography variant="body2" color="text.secondary">
            Category: {accommodation.category}
          </Typography>
        )}

        {accommodation.host && (
          <Typography variant="body2" color="text.secondary">
            Host: {accommodation.host.name}
          </Typography>
        )}

        <Button
          variant="outlined"
          component={Link}
          to={`/accommodation/${accommodation.id}`}
          sx={{ mt: 2 }}
        >
          More details
        </Button>
      </CardContent>
    </Card>
  );
}