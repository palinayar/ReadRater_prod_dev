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

const subtext = {
    fontSize:"10px"
  }
  const ratingStyle = {
    fontSize:"16px",
    fontWeight: "bold",
    textAlign: "right"
  }

  export default function Book({title, author, year, genre, picture}){
    return(
        <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <CardMedia
            component="img"
            sx={{
                // 16:9
                pt: '10%', aspectRatio: '3/2'
            }}
            image={picture}
            alt="random"
            />
            <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h6" component="h5" style={{lineHeight:"1.25em"}}>
                {title}
            </Typography>
            <Typography style={{fontWeight:"500"}}>
                {author}
            </Typography>
            <Typography style={{fontWeight:"300", fontStyle:"italic"}}>
                {year} 
            </Typography>
            <Typography style={{fontWeight:"300"}}>
                {genre}
            </Typography>
            </CardContent>
            <CardActions>
            <Button size="small">Rate</Button>
            <Box style={ratingStyle}>
            4
            </Box>
            </CardActions>
        </Card>
    )
  }
