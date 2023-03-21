import * as React from "react";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Box,
  Typography,
  TextField,
  CssBaseline,
} from "@material-ui/core";
import { Rating, Alert } from "@mui/material";

import readService from "./service.js";
import { UserContext } from "./context.js";
import { useNavigate } from "react-router";

import RatingCard from "./RatingCard.js";

export default function Book({
  title,
  author,
  year,
  genre,
  picture,
  avg_rating,
  bookID,
  rateEnabled,
}) {
  const { user, setUser } = React.useContext(UserContext);
  const [value, setValue] = React.useState(avg_rating); // Her må value være gjennomsnittlig rating hentet fra backend
  const [inpValue, setInpValue] = React.useState(3);
  const [text, setText] = React.useState("");
  const [showRateForm, setShowRateForm] = React.useState(false);
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [showRatings, setShowRatings] = React.useState(false);
  const [ratingsData, setRatingsData] = React.useState([]);
  const navigate = useNavigate();

  const handleClickRate = () => {
    if (showFeedback) {
      setShowFeedback(false);
    } else {
      if (!user) {
        alert("You have to log in to give your rating!");
        navigate("login");
      } else {
        setShowRateForm(true);
      }
    }
  };
  const handleSubmitRateForm = () => {
    setShowRateForm(false);
    setShowFeedback(true);
    setValue(inpValue);
    readService
      .addRating(inpValue, text, user.bruker_id, bookID)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };
  const handleOpenRatings = () => {
    setShowRatings(true);
    loadRatingsData();
  };
  const handleClickOff = (e) => {
    if (e.target.id === "rateBackdrop") {
      setShowRateForm(false);
      setShowRatings(false);
    } 
  };

  const loadRatingsData = () => {
    readService
      .getAllRatings(bookID)
      .then((data) => {
        setRatingsData(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };


  return (
    <>
      <CssBaseline />
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }} className="hoverShadow">
        <Box 
          style={{}}
          onClick={()=>{
            if (rateEnabled) {
              handleOpenRatings();
            }
          }}
        >
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
          <Grid
            container
            style={{
              alignSelf: "center",
              margin: "0px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Grid item style={{}}>
              <Button
                size="small"

                variant={rateEnabled ? "contained" : "outlined"}
                color="primary"
                style={{ color: "#2F5F2E", textAlign: "center" }}
                onClick={handleClickRate}

                disabled={!rateEnabled}
              >
                {showFeedback ? "Ok" : "Rate"}
              </Button>
            </Grid>
            <Grid
             item 
             className={rateEnabled ? "rateHover" : ""}
             onClick={()=>{
              if (rateEnabled) {
                handleOpenRatings();
              }
             }}
             style={{ display: "flex", alignItems: "center" }}
            >
              <Rating
                readOnly
                precision={0.1}
                name="simple-controlled"
                value={rateEnabled ? value : avg_rating} //Denne verdien må huskes per bruker
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </Grid>
          </Grid>
        </CardActions>


        <Box
          id="rateBackdrop"
          style={{
            position: "fixed",
            zIndex: "1101",
            width: "100%",
            height: "100%",
            top: "0px",
            left: "0px",

            backgroundColor: "rgba(240,240,240,0.8)",

            display: showRateForm || showRatings ? "block" : "none",
          }}
          onClick={(e) => {handleClickOff(e);}}
        >
          <Box
            id="rateForm"
            className="centerBox"
            style={{
              width: "400px",
              display: showRateForm ? "flex" : "none",
            }}
          >
            <Typography
              style={{
                fontSize: "30px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Give your rating of:
            </Typography>
            <Typography
              style={{
                fontSize: "30px",
                textAlign: "center",
                paddingBottom: "20px",
              }}
            >
              {title}
            </Typography>
            <TextField
              id="inpTextField"
              label="What did you think?"
              variant="filled"
              multiline
              minRows="8"
              maxRows="8"
              onChange={(event) => setText(event.currentTarget.value)}
              style={{}}
            />
            <Box
              style={{
                display: "flex",
                justifyContent: "space-around",
                padding: "20px",
              }}
            >
              <Rating
                size="large"
                value={inpValue}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setInpValue(event.currentTarget.value);
                  } /*Not allowed to set value NULL*/
                }}
              />
            </Box>
            <Box style={{ flexGrow: "1" }}></Box>
            <Button
              onClick={handleSubmitRateForm}
              type="submit"
              variant="contained"
            >
              Submit Rating
            </Button>
          </Box>
          <Box
            id="ratings"
            className="centerBox"
            style={{
              width: "600px",
              display: showRatings ? "flex" : "none",
              
            }}
          >
            <Typography
              style={{
                fontSize: "30px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              See the ratings of:
            </Typography>
            <Typography
              style={{
                fontSize: "30px",
                textAlign: "center",
                paddingBottom: "20px",
              }}
            >
              {title}
            </Typography>
            <Grid
              container
              spacing={4}
              style={{ marginTop: "0px", width: "auto" , overflowY: "scroll"}}
            >
              {ratingsData.map((item) => (
                <Grid item key={item.rangering_id} xs={12} sm={12} md={12}>
                  <RatingCard
                    username={item.brukernavn}
                    text={item.vurdering}
                    value={item.verdi}
                    ratingID={item.rangering_id}
                  />
                </Grid>
              ))}
            </Grid>

          </Box>
        </Box>

        <Alert severity="success" style={{display: showFeedback ? "flex" : "none"}}>Thanks for rating this book!</Alert>


      </Card>
    </>
  );
}
