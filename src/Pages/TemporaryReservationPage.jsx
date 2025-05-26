import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Alert
} from '@mui/material';
import { accommodationRepo } from '../repository/accommodationRepo';

const userId = 1;

const TemporaryReservationPage = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);

  const fetchReservations = () => {
    accommodationRepo.getTempReservationsByUser(userId)
      .then(res => setReservations(res.data))
      .catch(() => setError('Failed to load reservations.'));
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleDelete = async (id) => {
    try {
      await accommodationRepo.deleteTempReservation(id); // make sure this is implemented if needed
      fetchReservations();
    } catch {
      setError("Failed to delete reservation.");
    }
  };

  const handleClearAll = async () => {
    try {
      await accommodationRepo.clearTempReservations(userId); // implement this in accommodationRepo if not present
      fetchReservations();
    } catch {
      setError("Failed to clear reservations.");
    }
  };

  const handleReserveAll = async () => {
    try {
      await accommodationRepo.reserveAllTemp(userId); // implement this if using reserve-all
      fetchReservations();
    } catch {
      setError("Failed to reserve all.");
    }
  };

  return (
    <Container sx={{ mt: 15, backgroundColor: '#ffe4e1', p: 4, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#d81b60' }}>
        Temporary Reservations
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Button
        onClick={handleClearAll}
        color="error"
        variant="outlined"
        sx={{ mr: 2, borderColor: '#f48fb1', color: '#d81b60' }}
      >
        Clear All
      </Button>

      <Button
        onClick={handleReserveAll}
        variant="contained"
        sx={{
          backgroundColor: '#f06292',
          '&:hover': { backgroundColor: '#ec407a' },
          color: 'white'
        }}
      >
        Reserve All
      </Button>

      <TableContainer component={Paper} sx={{ mt: 3, backgroundColor: '#fff0f5' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f8bbd0' }}>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Rooms</strong></TableCell>
              <TableCell><strong>Available</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map(r => (
              <TableRow key={r.id}>
                <TableCell>{r.name}</TableCell>
                <TableCell>{r.numRooms}</TableCell>
                <TableCell style={{ color: r.isAvailable ? 'green' : 'red' }}>
                  {r.isAvailable ? 'Yes' : 'No'}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(r.id)}
                    sx={{ borderColor: '#f48fb1', color: '#d81b60' }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TemporaryReservationPage;