import React from 'react'
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';


const OuterBox = styled(Box)({
    position: 'relative',
    width: '25%',
    margin: 'auto',
    aspectRatio: "43 / 48"
  });
  
  const InnerBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: '1px solid #4C6665',
    borderRadius: '10px',
    zIndex: 1,
    
    pointerEvents: 'none'
  }));
  
  const ContentBox = styled(Box)(({ theme }) => ({
      position: "relative",
      borderRadius: "10px",
      padding: "10% 15%",
      zIndex: 2,
      
      
  }));
  

  

export default function AboutComponents({title,infos}) {
  return (
    <OuterBox id='aboutcards'>
      <InnerBox style={{ backgroundColor: '#e9e9e900', top: '-35px', left: '-5px', border: '1px solid #00192F', zIndex:"20" }} />
      <InnerBox style={{ backgroundColor: '#e9e9e900', top: '-20px', left: '5px', border: '1px solid #A26D5D', zIndex:"20" }} />
      
      
      <ContentBox style={{ width: '100%', height: '100%' }}>
        <Typography variant="h6" component="h2" gutterBottom id='findthebest'>
          {title}
        </Typography>
        <Typography variant="body1" paragraph id='findthebestt'>
          {infos}
        </Typography>
      </ContentBox>
    </OuterBox>
  )
}
