import * as React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Box,
  Typography,
} from "@material-ui/core";
import { Rating, Alert } from "@mui/material";

const ratingStyle = {
  fontSize: "16px",
  fontWeight: "bold",
  textAlign: "right",
  paddingRight: "5px",
};

var click = 0;

export default function Book({
  title,
  author,
  year,
  genre,
  picture,
  avg_rating,
}) {
  var [activeClick, setActiveClick] = React.useState(click);
  const [value, setValue] = React.useState(avg_rating); // Her må value være gjennomsnittlig rating hentet fra backend

  const handleClicked = () => {
    if (activeClick === 0) {
      setActiveClick(click + 1);
      setValue(avg_rating);
    } else {
      setActiveClick(click - 1);
    }
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box style={{}}>
        <CardMedia
          component="img"
          style={{
            width: "100%",
            height: "100%",
            aspectRatio: "2/3",
          }}
          image={picture}
          alt="Book Image"
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, py: "0px" }}>
        <Typography
          gutterBottom
          variant="h6"
          component="h5"
          style={{
            lineHeight: "1.25em",
            marginTop: ".5em",
            marginBottom: ".5em",
          }}
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
          <Grid style={{ paddingTop: 5 }}>
            <Rating
              readOnly
              name="simple-controlled"
              value={value} //Denne verdien må huskes per bruker
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
            style={{ color: "#2F5F2E" }}
            onClick={handleClicked}
          >
            {activeClick === 1 ? "ok" : "Rate"}
          </Button>
          {activeClick === 1 ? (
            <Alert severity="success">Thanks for rating this book!</Alert>
          ) : (
            <Grid></Grid>
          )}
        </Grid>
      </CardActions>
    </Card>
  );
}
