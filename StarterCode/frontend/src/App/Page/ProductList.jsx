import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductList = () => {
  const [products, setProducts] = useState([]);


  //implement the get products function
  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  //implement the delete function
  const handleDelete = async(id) => {
    try {
      await axios.delete(`http://localhost:5001/api/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };
  

  return (
    <>
      <Typography
        variant="h4"
        align="center"
        sx={{ mt: 4, mb: 4, fontWeight: 'bold' }}
      >
        Simple Card List
      </Typography>
  
      <Container
        maxWidth="md"
        sx={{
          mt: 4,
          mb: 4,
        }}
      >
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          {products.map((product) => (
            <Grid
              item
              key={product.id}
              xs={12}
              sm={6}
              md={4}
              sx={{ minWidth: 280 }}
            >
              <Card
                sx={{
                  width: '100%',
                  maxWidth: 300,
                  mx: 'auto',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 6,
                  },
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.imageUrl}
                    alt={product.name}
                  />
                  <IconButton
                    onClick={() => handleDelete(product.id)}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      backgroundColor: 'white',
                    }}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box>
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography>${product.price}</Typography>
                  <Typography variant="body2">{product.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
  
};

export default ProductList;