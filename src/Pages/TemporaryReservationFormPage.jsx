import React, { useState, useEffect } from 'react';
import {
  Container, TextField, Button, MenuItem, Typography, Alert
} from '@mui/material';
import {accommodationRepo} from '../repository/accommodationRepo';


const TempReservationForm = () => {
  const [accommodationId, setAccommodationId] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [accommodations, setAccommodations] = useState([]);


  const userId = 1; // Static user for now

  useEffect(() => {
    accommodationRepo.findAll()
      .then(res => setAccommodations(res.data))
      .catch(() => setError("Failed to load accommodations."));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const payload = {
        user_id: userId,
        accommodation_id: parseInt(accommodationId),
        start,
        end,
      };
      await accommodationRepo.addTempReservation(payload); // Make sure this function exists in your repo
      setSuccess("Reservation successfully added.");
      setAccommodationId('');
      setStart('');
      setEnd('');
    } catch (err) {
      setError("Failed to create reservation.", err);
    }
  };

  return (
    <Container sx={{ mt: 20 }}>
      <Typography variant="h5" gutterBottom>
        Create Reservation
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <TextField
          select
          label="Accommodation"
          value={accommodationId}
          onChange={(e) => setAccommodationId(e.target.value)}
          required
        >
          {accommodations.map(acc => (
            <MenuItem key={acc.id} value={acc.id}>
              {acc.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Start Date"
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          required
        />

        <TextField
          label="End Date"
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          required
        />

        <Button type="submit" variant="contained" color="primary">
          Add Reservation
        </Button>
      </form>
    </Container>
  );
};

export default TempReservationForm;