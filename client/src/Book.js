import * as React from "react";
import {
  ThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
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
} from "@material-ui/core";
import { Rating, Alert } from "@mui/material";

import readService from "./service.js";
import { UserContext } from "./context.js";
import { useNavigate } from "react-router";

// const ratingStyle = {
//   fontSize: "16px",
//   fontWeight: "bold",
//   textAlign: "right",
//   paddingRight: "5px",
// };

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
  var [rateState, setRateState] = React.useState(0); // 0:= Standard, 1:= Rating form, 2:= Feedback box
  const [value, setValue] = React.useState(avg_rating); // Her må value være gjennomsnittlig rating hentet fra backend
  const [inpValue, setInpValue] = React.useState(3);
  const [text, setText] = React.useState("");
  const navigate = useNavigate();

  const handleClicked = () => {
    if (!user) {
      alert("You have to log in to give your rating!");
      navigate("login");
    } else {
      if (rateState === 0) {
        setRateState(1);
        setValue(avg_rating);
      } else if (rateState === 1) {
        setRateState(2);
      } else {
        setRateState(0);
      }
    }
  };

  const handleSubmitRating = () => {
    setRateState(2);
    setValue(inpValue);
    readService
      .addRating(inpValue, text, user.bruker_id, bookID)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  window.addEventListener("click", function (e) {
    // Click off the submit rating page
    if (
      rateState === 1 &&
      !document.getElementById("rateForm").contains(e.target) &&
      document.getElementById("rateBackdrop").contains(e.target)
    ) {
      setRateState(0);
    }
  });

  const theme = createTheme({
    palette: {
      primary: {
        main: "#2f5f2e",
      },
      secondary: {
        main: "#ffffff",
      },
    },
    typography: {
      fontFamily: "Bookman Old Style",
    },
  });

  return (
    <ThemeProvider theme={theme}>
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
                variant={rateEnabled ? "text" : "outlined"}
                color="success"
                style={{ color: "#2F5F2E", textAlign: "center" }}
                onClick={handleClicked}
                disabled={!rateEnabled}
              >
                {rateState === 2 ? "ok" : "Rate"}
              </Button>
            </Grid>
            <Grid item style={{ display: "flex", alignItems: "center" }}>
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

            {rateState === 1 ? ( // This Block changes: nothing / rate window / feedback box
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
                }}
              >
                <Box
                  id="rateForm"
                  style={{
                    width: "400px",
                    // height:"600px",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    backgroundColor: "white",
                    borderRadius: "20px",
                    boxShadow: "0px 2px 15px 2px #aaa",

                    display: "flex",
                    flexDirection: "column",
                    padding: "30px",
                    alignItems: "stretch",
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
                    onClick={handleSubmitRating}
                    type="submit"
                    variant="contained"
                  >
                    Submit Rating
                  </Button>
                </Box>
              </Box>
            ) : rateState === 2 ? (
              <Alert severity="success">Thanks for rating this book!</Alert>
            ) : (
              <Grid></Grid>
            )}
          </Grid>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}
