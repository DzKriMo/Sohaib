import React from 'react'
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import { Link } from '@inertiajs/inertia-react'; 
import { styled } from '@mui/system';


const StyledLink = styled(Link)({
  display: 'inline-block',
  padding: '15px 75px',
  backgroundColor: '#4C6665',
  color: '#ffffff',
  borderRadius: '12px',
  textDecoration: 'none',
  textAlign: 'center',
  fontSize: '16px',
  margin: 'auto',

  fontWeight: '100',
  boxShadow: '5px 5px 13px 1px #00000040',
  transition: 'color 0.3s, box-shadow 0.3s',
  '&:hover': {
    color: '#00192F',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
  },
});

export default function Contact() {
  return (
    <>
      <h1 style={{textAlign:"center",fontFamily:"'Playfair Display', serif",background:"#9AB5AE",fontSize:"30px",fontWeight:"600",paddingBottom:"10px",marginTop:"-5px"}}>Contact Us</h1>
      <div style={{minHeight:"100vh",paddingTop:"15vh"}}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Stack direction="row">
              <div style={{width:"20%",height:"100%"}}></div>
              <Stack direction="column" spacing={2} justifyContent="center">
                <h1 className='authTitles' style={{textAlign:"start"}}>Send a Message</h1>
                <p style={{color:"#00192F"}}>Don’t hesitate to contact us if you got any further question</p>

                <FormControl className='singupemail'  sx={{width: {xs: '70%', sm: '100%'}}}  style={{marginTop:"5vh"}}>
                  <FormLabel className='authLable'>Email Adress</FormLabel>
                  <input className='authInput'/>
                </FormControl> 

                <FormControl className='singupemail'  sx={{width: {xs: '70%', sm: '100%'}}}  style={{marginTop:"5vh"}}>
                  <FormLabel className='authLable'>Message</FormLabel>
                  <input className='authInput' style={{height:"20vh"}}/>
                </FormControl> 

                <StyledLink id='sendMessageButton' style={{marginTop:"5vh"}}>Send Message</StyledLink>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Stack direction="row">
              <div style={{width:"20%",height:"100%"}}></div>
              <Stack direction="column" spacing={2} justifyContent="center" style={{paddingBottom:"5vh"}}>
                <h1 className='authTitles' style={{textAlign:"start"}}>Get in Touch</h1>
                <p style={{color:"#00192F"}}>
                  We'd love to hear from you! Whether you have a question, feedback, or need assistance, our team is here to help. 
                  Reach out to us through any of the following channels:
                </p>
                <p style={{color:"#00192F"}}><i className="fas fa-phone"></i> Phone Number: 05566778899</p>
                <p style={{color:"#00192F"}}><i className="fas fa-envelope"></i> Email: your-email@example.com</p>
                 <div style={{width:"100%",height:"2px",background:"#00000070",marginTop:"5vh"}}></div>

                <p style={{color:"#00192F",textAlign:"center",fontWeight:"600",paddingBottom:"2vh"}}>Follow Us on Social Media!</p>
                <Stack direction="row" spacing={2} style={{ margin: "auto" }}>
            <img src="./assets/facebook.svg" alt="facebook" style={{ width: "20%" }} />
            <img src="./assets/tiktok.svg" alt="facebook" style={{ width: "20%" }} />
            <img src="./assets/insta.svg" alt="facebook" style={{ width: "20%" }} />
          </Stack>
              </Stack>
              <div style={{width:"20%",height:"100%"}}></div>
            </Stack>
          </Grid>
        </Grid>
      </div>
    </>
  )
}
