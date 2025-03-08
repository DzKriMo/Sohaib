import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from '@inertiajs/inertia-react'; 

const OuterBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '60%', 
  margin: 'auto',
  aspectRatio: '43 / 48',
  [theme.breakpoints.down('sm')]: {
    width: '80%', 
    height: '50vh'
  },
  [theme.breakpoints.up('sm')]: {
    width: '60%', 
  },
}));

const InnerBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  border: '1px solid #4C6665',
  borderRadius: '10px',
  zIndex: 1,
  boxShadow: '0px 0px 15px rgba(0,0,0,0.1)',
  pointerEvents: 'none'
}));

const ContentBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  backgroundColor: '#BCD7D0',
  borderRadius: '10px',
  padding: '20px 40px',
  zIndex: 2,
  boxShadow: '0px 0px 15px rgba(0,0,0,0.1)',
}));

const StyledLink = styled(Link)({
  display: 'inline-block',
  padding: '10px 25px',
  backgroundColor: '#4C6665',
  color: '#ffffff',
  borderRadius: '12px',
  textDecoration: 'none',
  textAlign: 'center',
  fontSize: '12px',
  fontWeight:"100",
  boxShadow: "5px 5px 13px 1px #00000040",
  transition: 'color 0.3s, box-shadow 0.3s', 
  '&:hover': {
    color:"#00192F", 
    boxShadow: '0px 4px 10px rgba(0,0,0,0.2)', 
  },
  
});

const TypographyStyles = styled(Typography)(({ theme }) => ({
  marginTop: '15%',
  [theme.breakpoints.down('xs')]: {
    marginTop: '5%',
  },
}));

const FashionComponent = () => {
  return (
    <OuterBox>
      <InnerBox style={{ backgroundColor: '#e9e9e900', top: '-55px', left: '-10px', border: '1px solid #00192F', zIndex:"20" }} />
      <InnerBox style={{ backgroundColor: '#e9e9e900', top: '-20px', left: '10px', border: '1px solid #00192F', zIndex:"20" }} />
      <InnerBox style={{ backgroundColor: '#9AB5AE', top: '-35px', left: '-20px',boxShadow: "5px 5px 13px 1px #00000060" }} />
      
      <ContentBox style={{ width: '100%', height: '100%',boxShadow: "5px 5px 13px 1px #00000060" }}>
        <TypographyStyles variant="h5" component="h2" gutterBottom id='findthebest' style={{marginTop: "15%"}}>
          Find The Best <br /> Fashion Style For You!
        </TypographyStyles>
        <TypographyStyles variant="body1" paragraph id='findthebestt'style={{marginTop: "15%"}}>
          Explore top brands and find everything you need, from gadgets to fashion, all in one place. 
          Enjoy secure payments, fast shipping, and excellent customer service. 
          Shop easily and confidently with ShopEase.
        </TypographyStyles>

        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "15%" }}>
          <StyledLink href="/store">
            Explore Our Store
          </StyledLink>
        </div>
      </ContentBox>
    </OuterBox>
  );
};

export default FashionComponent;
