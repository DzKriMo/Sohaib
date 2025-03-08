import React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/system';
import { Link } from '@inertiajs/inertia-react'; 
import Grid from '@mui/material/Unstable_Grid2';

const StyledLink = styled(Link)({
  display: 'inline-block',
  padding: '10px 25px',
  backgroundColor: '#4C6665',
  color: '#ffffff',
  borderRadius: '12px',
  textDecoration: 'none',
  textAlign: 'center',
  fontSize: '12px',
  marginInline: '20%',
  fontWeight: '100',
  boxShadow: '5px 5px 13px 1px #00000040',
  transition: 'color 0.3s, box-shadow 0.3s',
  '&:hover': {
    color: '#00192F',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
  },
});

const Price = styled('p')(({ discount }) => ({
  fontSize: '16px',
  textDecoration: discount ? 'line-through' : 'none',
  color: discount ? '#4C6665' : '#00192F',
  fontWeight: discount ? '300' : 'bold',
  margin: 0,
}));

const DiscountedPrice = styled('p')({
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#00192F',
  marginLeft: '5%',
});



export default function ProductCard({ article }) {
  console.log(article.id)
  const url = "/productdetails/"+article.id.toString();
  return (
    <div className="card" style={{ padding: '2%', borderRadius: '2.5%', boxShadow: '5px 5px 13px 1px #00000040' }}>
      <img className='productCardImage' src={article.imageUrl} alt={article.title} style={{ width: '23vw', aspectRatio: '1/1', borderRadius: '2.5%', margin: 'auto' }} />
      <h3 style={{ marginTop: '5%', fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: '600', color: '#00192F' }}>{article.title}</h3>
      <p style={{ color: '#4C6665', fontSize: '12px', marginTop: '2%' }}>{article.category}</p>

      <Grid item container spacing={2} style={{ marginBottom: '5%' }}>
        <Grid item xs={12} sm={7}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {article.discountPrice ? (
              <>
                <Price discount>{article.price}DA</Price>
                <DiscountedPrice>{article.discountPrice}DA</DiscountedPrice>
              </>
            ) : (
              <Price>{article.price}DA</Price>
            )}
          </div>
          <p style={{ color: '#00192F', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            <i className={`fas fa-${article.inStock ? 'check' : 'times'}`} style={{ marginRight: '5px' }}></i>
            {article.inStock ? 'In stock' : 'Out of stock'}
          </p>
        </Grid>
        <Grid item container xs={12} sm={5} spacing={1}>
          {article.colors.map((color, index) => (
            <Grid item key={index}>
              <Avatar sx={{ bgcolor: color, width: 24, height: 24 }} alt=" " src=" " />
            </Grid>
          ))}
        </Grid>
      </Grid>

      <StyledLink href={url}>See more details</StyledLink>
    </div>
  );
}
