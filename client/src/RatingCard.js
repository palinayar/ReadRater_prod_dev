import * as React from "react";
import {
  ThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardContent,
  Box,
  Typography,
} from "@material-ui/core";
import { Rating, Alert } from "@mui/material";

import readService from "./service.js";
import { UserContext } from "./context.js";
import { useNavigate } from "react-router";


export default function RatingCard({
  value,
  text,
  username,
  ratingID,
}) {
  const { user, setUser } = React.useContext(UserContext);
  const navigate = useNavigate();

  const handleRemoveRating = () => {
    readService
      .deleteRating(ratingID)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

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
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }} className="hoverShadow">
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
            {username}
          </Typography>
          <Typography style={{ fontWeight: "300" }}>{text}</Typography>

          <Box
            style={{ display: "flex", alignItems: "center" }}
          > 
            <Rating
              readOnly
              precision={1}
              name="simple-controlled"
              value={value}
            />
          </Box>
          <Button
            variant="outlined"
            style={{
              color:"red",
              display: user.isAdmin ? "block" : "none",
            }}
            onClick={handleRemoveRating}
          >
            Remove Rating
          </Button>
        </CardContent>
      </Card>
  );
} // #TODO Gjør ferdig ratingCard, implementer med db,
