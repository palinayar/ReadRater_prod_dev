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


const ratingStyle = {
  fontSize: "16px",
  fontWeight: "bold",
  textAlign: "right",
  paddingRight: "5px",
};
let ratingValue = 4; //#TODO Her må det legges inn en utregning av ratingen til hver bok

export default function Book({ title, author, year, genre, picture }) {
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
      <CardActions style={{ display: "flex" }}>
        <Button size="small" variant="text" color="success" style={{color:"#2F5F2E"}}>Rate</Button>
        <Box style={{ flexGrow: "1" }}></Box>
        <Box style={ratingStyle}>{ratingValue}/10 ★</Box>
      </CardActions>
    </Card>
  );
}
