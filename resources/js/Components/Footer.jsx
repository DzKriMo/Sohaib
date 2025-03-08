import React from 'react';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery'



export default function Footer() {
  const isXs = useMediaQuery('(max-width:600px)');
  return (
    <Stack style={{ width: "100%", background: "#9AB5AE" ,paddingBottom:"2vh"}} direction="row" spacing={2}>
      <Stack 
            sx={{
              width:{
                xs:"25%",
                sm:"33%"
              }
            }}>
        <img src="/assets/logo.png" alt="Logo" style={{ width: "15vw", margin: "auto" }} />
      </Stack>


      
      <Stack style={{ width: "34%", margin: "auto",paddingTop:"2%" }}>
      <div style={{ margin: "auto" }}>  
      <Stack style={{ width: "100%", margin: "auto" }} direction="column" spacing={isXs ? 1 : 2}>
          <Stack style={{ width: "100%",marginTop:"5px" }} direction="row" spacing={2}>
            <img src="/assets/location.svg" alt="location" style={{ width: "2vw" }} />
            <h1 style={{ marginBlock: "auto" }}><strong>Our Location:</strong></h1>
          </Stack>
          <p>Rue Bugeaud a côté maison mobilis</p>

          <Stack style={{ width: "100%", marginTop: "5%" }} direction="row" spacing={2}>
            <img src="/assets/call.svg" alt="call" style={{ width: "2vw" }} />
            <h1 style={{ marginBlock: "auto" }}><strong>Call us on :</strong></h1>
          </Stack>
          <p>056644332211 / 0677889944</p>

          <Stack style={{ width: "100%", marginTop: "5%" }} direction="row" spacing={2}>
            <img src="/assets/email.svg" alt="email" style={{ width: "2vw" }} />
            <h1 style={{ marginBlock: "auto" }}><strong>Contact :</strong></h1>
          </Stack>
          <p>shopemailname@gmail.com</p>
        </Stack>
        </div> 
      </Stack>

      <Stack style={{ width: "33%" }}>
        <div style={{ height: "30%", minHeight: "30%", width: "100%" }}></div>
        <Stack>
          <p style={{ textAlign: "center" ,paddingBottom:"2%"}}>Follow us on social media!</p>
          <Stack direction="row" spacing={1} style={{ margin: "auto" }}>
            <img src="/assets/facebook.svg" alt="facebook" style={{ width: "25%" }} />
            <img src="/assets/tiktok.svg" alt="facebook" style={{ width: "25%" }} />
            <img src="/assets/insta.svg" alt="facebook" style={{ width: "25%" }} />
          </Stack>
        </Stack>
        <div style={{  width: "100%", }}></div>
        <p style={{  margin: "auto",}}>Made with ❤️</p>
      </Stack>
    </Stack>
  );
}
