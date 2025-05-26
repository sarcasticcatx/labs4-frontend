import React, { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Paper,
  MenuItem
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import {accommodationRepo} from '../repository/accommodationRepo.js';


const CATEGORY_ENUM = ['Room', 'House', 'Flat', 'Apartment', 'Hotel', 'Motel'];

const AccommodationFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [accommodation, setAccommodation] = useState({
    name: '',
    numRooms: '',
    isAvailable: true,
    category: ''
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit) {
      accommodationRepo.findById(id)
        .then(res => {
          const data = res.data;
          setAccommodation({
            name: data.name,
            numRooms: data.numRooms.toString(),
            isAvailable: data.isAvailable,
            category: data.category || ''
          });
        })
        .catch(err => {
          console.error('Failed to load accommodation', err);
          setError('Failed to load accommodation.');
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAccommodation(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const data = {
      name: accommodation.name,
      numRooms: parseInt(accommodation.numRooms),
      isAvailable: accommodation.isAvailable,
      category: accommodation.category || null
    };

    try {
      if (isEdit) {
        await accommodationRepo.update(id, data);
      } else {
        await accommodationRepo.create(data);
      }
      navigate('/accommodation/all');
    } catch (err) {
      console.error(err);
      setError(isEdit ? 'Failed to update accommodation.' : 'Failed to add accommodation.');
    }
  };

  return (
    <Container sx={{ pt: 10, mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: '#f3e5f5', borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom color="primary">
          {isEdit ? 'Edit Accommodation' : 'Add New Accommodation'}
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            name="name"
            label="Name"
            value={accommodation.name}
            onChange={handleChange}
            required
            sx={{ backgroundColor: '#ffffff', borderRadius: 1 }}
          />

          <TextField
            name="numRooms"
            label="Number of Rooms"
            type="number"
            value={accommodation.numRooms}
            onChange={handleChange}
            required
            sx={{ backgroundColor: '#ffffff', borderRadius: 1 }}
          />

          <TextField
            name="category"
            label="Category"
            select
            value={accommodation.category}
            onChange={handleChange}
            required
            sx={{ backgroundColor: '#ffffff', borderRadius: 1 }}
          >
            {CATEGORY_ENUM.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>

          <FormControlLabel
            control={
              <Checkbox
                name="isAvailable"
                checked={accommodation.isAvailable}
                onChange={handleChange}
                sx={{ color: '#ab47bc' }}
              />
            }
            label="Is Available"
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#ba68c8',
              '&:hover': { backgroundColor: '#9c27b0' },
              color: 'white'
            }}
          >
            {isEdit ? 'Update Accommodation' : 'Add Accommodation'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AccommodationFormPage;