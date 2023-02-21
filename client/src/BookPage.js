import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Book from './Book.js'
import { Icon } from '@mui/material';
import bookIconW from "./images/book-icon_white.png";
import {useNavigate} from 'react-router-dom';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';



function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        ReadRater
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const appBarHeight = "70px"

export default function BookPage() {
  const navigate = useNavigate()
  return (
    <>
      <CssBaseline />
      <AppBar position="relative" style={{height:appBarHeight, backgroundColor:"#2F5F2E"}}>
        <Toolbar style ={{display:"flex"}}>
          <Box style={{height:appBarHeight, width:appBarHeight, display:"flex", alignContent:"center", justifyContent:"center"}}>
            <img src = {bookIconW} 
              style={{
                height:appBarHeight, 
                position:"relative",  
                boxSizing:"borderbox",
                padding: "10px" 
            }}/>
          </Box>
          <Typography style={{fontFamily:"futura, helvetica, arial, sans-serif", fontSize:"26px", }} variant="h6" color="inherit" noWrap>
            ReadRater
          </Typography>
          <Box style={{flexGrow:"1"}}></Box>
          <Button 
            variant="contained" 
            color="success" 
            style={{BackgroundColor:"#2F5F2E"}}
            onClick={() => navigate("login")}>
            Login 
          </Button> 
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 6,
            pb: 0,
          }}
        >
          <Container style ={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Typography style={{marginBottom:"30px"}}
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Welcome to ReadRater!
            </Typography>
            <Button 
            variant="outlined" 
            color="success" 
            style={{display:"inline-block", width:"150px", color:"#2F5F2E", borderColor:"#2F5F2E"}}
            onClick={() => navigate("add-new-book")}>
              Add book
            </Button> {/*#TODO Hvis bruker er logget inn: link til addbook-side. Om nei, til login-side */}
          </Container>
        </Box>
        <Container sx={{ py: 4 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={10} sm={4} md={3}>
                <Book title = "Harry Potter" author = "J.K.Rowling" year = "2005" genre = "Fantacy" picture="http://prodimage.images-bn.com/pimages/9780545139700_p0_v5_s1200x630.jpg">
                </Book> {/* #TODO Her kom å legge til infoen fra hver bok */}
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          ReadRater: The application for rating books!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
      </>
  );
}