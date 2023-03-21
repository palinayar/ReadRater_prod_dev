import React, { useState, useContext } from "react";
import {
  ThemeProvider,
  createTheme,
  makeStyles,
} from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import bookIcon from "./images/book-icon.png";
import Book from "./Book.js";
import { Rating } from "@mui/material";
import readService from "./service.js";
import { UserContext } from "./context";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const imagestyle = {
  position: "absolute",
  top: "50%",
  right: "-160px",
  transform: "translate(0%,-50%)",
};

export default function Login() {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [picture, setPicture] = useState("");
  const [inpValue, setInpValue] = useState(3);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    readService
      .addBook(author, title, genre, picture, year, inpValue, user.bruker_id)
      .then((response) => {
        navigate("/");
        console.log(response);
      })
      .catch((error) => console.log(error));
    // You would typically make a network call here to authenticate the user
  };
  const handleBtnClick = () => {
    console.log(user);
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <Container
        component="main"
        maxWidth="xs"
        style={{ position: "relative" }}
      >
        <Box
          style={{
            position: "absolute",
            left: "-220px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "200px",
            maxWidth: "200px",
          }}
        >
          <Book
            title={title}
            author={author}
            year={year}
            genre={genre}
            picture={picture}
            avg_rating={inpValue}
            rateEnabled={false}
          />
        </Box>
        <Box mt={5}>
          <Typography component="h1" variant="h5">
            Add a new book to our collection!
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Title"
              label="Book Title"
              name="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="author"
              label="Author"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="year"
              label="Year"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="genre"
              label="Genre"
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="picture"
              label="Picture"
              id="pircture"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
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
                style={{ backgroundColor: "#ebf5ed" }}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setInpValue(newValue);
                  } /*Not allowed to set value NULL*/
                }}
              />
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleBtnClick}
            >
              Add Book
            </Button>
          </form>
        </Box>
        <img src={bookIcon} style={imagestyle} />
      </Container>
    </div>
  );
}
