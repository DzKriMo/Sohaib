import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/system';
import { Link } from '@inertiajs/inertia-react'; 
import Box from '@mui/material/Box';

const StyledLink = styled(Link)({
  display: 'inline-block',
  padding: '10px 25px',
  backgroundColor: '#4C6665',
  color: '#ffffff',
  borderRadius: '12px',
  textDecoration: 'none',
  textAlign: 'center',
  fontSize: '12px',
  fontWeight: '100',
  boxShadow: '5px 5px 13px 1px #00000040',
  transition: 'color 0.3s, box-shadow 0.3s',
  '&:hover': {
    color: '#00192F',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
  },
});

export default function MostSelled({ product }) {  
  return (
    <Box sx={{ textAlign: 'center' }}>
      <h1 id="mostselledtitle">Most Selled Product</h1>
      <div style={{ display: 'flex' }}>
        <Box id="mostSelledImageContainer">
          <img src={product.imageUrl} className='mostSelledCardImage' alt="Most Sold Product" />
        </Box>
      </div>
      <div style={{ display: 'flex' }}>
        <Grid container spacing={2} style={{ margin: 'auto', width: '55%' }}>
          <Grid xs={8}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: '600' }}>{product.title}</p>
          </Grid>
          <Grid xs={4}>
            <p style={{ color: '#4C6665', fontSize: '20px' }}>{product.category}</p>
          </Grid>
          <Grid xs={6}>
            <p style={{ fontWeight: '600',wordBreak:"break-word",overflowWrap:"break-word" }}>
              <span style={{ color: '#4C6665', textDecoration: 'line-through', fontWeight: '400' }}>{product.originalPrice}</span>&nbsp;
              {product.discountPrice}
            </p>
          </Grid>
          <Grid xs={6}>
            <StyledLink>See more details</StyledLink>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}
