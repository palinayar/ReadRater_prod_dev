import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Rating from "@mui/material/Rating";
import Alert from '@mui/material/Alert';



const ratingStyle = {
  fontSize: "16px",
  fontWeight: "bold",
  textAlign: "right",
  paddingRight: "5px",
};
let ratingValue = 2; //#TODO Her må det legges inn en utregning av ratingen til hver bok

var click = 0;

export default function Book({ title, author, year, genre, picture }) {
  var [activeClick, setActiveClick] = React.useState(click);
  const [value, setValue] = React.useState(ratingValue);  // Her må value være gjennomsnittlig rating hentet fra backend

  const handleClicked = () => {
    setActiveClick(click + 1)
    setValue(ratingValue)
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box style={{}}>
        <CardMedia
          component="img"
          sx={{

            width:"100%",
            height:"100%",
            aspectRatio:"2/3",
          }}
          image={picture}
          alt="Book Image"
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, py:"0px"}}>
        <Typography
          gutterBottom
          variant="h6"
          component="h5"
          style={{ lineHeight: "1.25em", marginTop:".5em", marginBottom:".5em" }}
        >
          {title}
        </Typography>
        <Typography style={{ fontWeight: "500" }}>{author}</Typography>
        <Typography style={{ fontWeight: "300", fontStyle: "italic" }}>
          {year}
        </Typography>
        <Typography style={{ fontWeight: "300" }}>{genre}</Typography>
      </CardContent>
      <CardActions style={{ display: "flex", flexWrap: "wrap" }}>
        <Box style={{ flexGrow: "1" }}></Box>
        {/* <Box style={ratingStyle}>{ratingValue}/10 ★</Box> */}
        <Grid style={{ alignSelf: "center" }}>
            <Grid style={{paddingTop: 5}}>
              <Rating
                name="simple-controlled"
                value={value}             //Denne verdien må huskes per bruker
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </Grid>
        </Grid>
        <Grid>
          <Button 
            size="small" 
            variant="text" 
            color="success" 
            style={{color:"#2F5F2E"}} 
            onClick={handleClicked}>
              Rate
          </Button>
          {activeClick === 1 ? (
            <Alert severity="success">Thanks for rating this book!</Alert>
          ):(
            <Grid></Grid>
          )}
        </Grid>
      </CardActions>
    </Card>
  );
}
