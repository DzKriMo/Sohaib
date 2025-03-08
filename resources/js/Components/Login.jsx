import React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import { styled } from '@mui/system';
import { Link } from '@inertiajs/inertia-react'; 

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
  marginTop: "10vh",
  fontWeight: '100',
  boxShadow: '5px 5px 13px 1px #00000040',
  transition: 'color 0.3s, box-shadow 0.3s',
  '&:hover': {
    color: '#00192F',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
  },
});

export default function Login() {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <div style={{ height: "100vh", background: "#BCD7D0", width: "70vw", margin: "auto", paddingBottom: "10vh", paddingTop: "15vh" }}>
        <h1 className='authTitles'>Log in</h1>

        <FormControl style={{ margin: "auto", marginTop: "5vh" }}
          sx={{
            width: {
              xs: '70%',
              sm: '45%'
            }
          }}>
          <FormLabel className='authLable'>Email Address</FormLabel>
          <input className='authInput' />
        </FormControl>
        <FormControl style={{ margin: "auto", marginTop: "5vh" }}
          sx={{
            width: {
              xs: '70%',
              sm: '45%'
            }
          }}>
          <FormLabel className='authLable'>Password</FormLabel>
          <input className='authInput' />
        </FormControl>

        <div style={{ display: "flex" }}>
          <StyledLink href="/login">Login</StyledLink> 
        </div>
        <p style={{ textAlign: "center", fontWeight: "600", color: "#00192F", marginTop: "5vh" }}>Don't have an account? &nbsp;
          <span style={{ fontWeight: "400", textDecoration: "underline", color: "#4C6665" }} >
            <Link href="/signupp" style={{ fontWeight: "400", textDecoration: "underline", color: "#4C6665" }}>
              Sign up
            </Link></span></p>
      </div>
    </div>
  )
}
