import React from 'react';
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';

// Static enum list (matching your backend Category enum)
const CATEGORY_ENUM = [
    { name: 'Room' },
    { name: 'House' },
    { name: 'Flat' },
    { name: 'Apartment' },
    { name: 'Hotel' },
    { name: 'Motel' },
];

const CategoriesList = () => {
    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Categories
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>ID</strong></TableCell>
                            <TableCell><strong>Name</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {CATEGORY_ENUM.map((category, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{category.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default CategoriesList;
