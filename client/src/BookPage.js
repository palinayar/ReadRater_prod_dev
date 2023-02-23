import React, { useState, useEffect } from "react";
import {
  AppBar,
  Button,
  CssBaseline,
  Grid,
  Box,
  Toolbar,
  Typography,
  Container,
  Link,
} from "@material-ui/core";
import Book from "./Book.js";
import bookIconW from "./images/book-icon_white.png";
import { useNavigate } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
} from "react-router-dom";
import readService from "./service.js";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        ReadRater
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const appBarHeight = "70px";

export default function BookPage() {
  const [books, setBooks] = useState([]);
  // const [rating, setRating] = useState();
  //This is how you fetch the data from the database, use in components
  useEffect(() => {
    readService
      .getAllBooks()
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const navigate = useNavigate();
  return (
    <>
      <CssBaseline />
      <AppBar
        position="relative"
        style={{ height: appBarHeight, backgroundColor: "#2F5F2E" }}
      >
        <Toolbar style={{ display: "flex" }}>
          <Box
            style={{
              height: appBarHeight,
              width: appBarHeight,
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={bookIconW}
              style={{
                height: appBarHeight,
                position: "relative",
                boxSizing: "borderbox",
                padding: "10px",
              }}
            />
          </Box>
          <Typography
            style={{
              fontFamily: "futura, helvetica, arial, sans-serif",
              fontSize: "26px",
            }}
            variant="h6"
            color="inherit"
            noWrap
          >
            ReadRater
          </Typography>
          <Box style={{ flexGrow: "1" }}></Box>
          <Button
            variant="contained"
            color="success"
            style={{ BackgroundColor: "#2F5F2E" }}
            onClick={() => navigate("login")}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 6,
            pb: 0,
          }}
        >
          <Container
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              style={{ marginBottom: "30px" }}
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
              style={{
                display: "inline-block",
                width: "150px",
                color: "#2F5F2E",
                borderColor: "#2F5F2E",
              }}
              onClick={() => navigate("add-new-book")}
            >
              Add book
            </Button>{" "}
            {/*#TODO Hvis bruker er logget inn: link til addbook-side. Om nei, til login-side */}
          </Container>
        </Box>
        <Container sx={{ py: 4 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4} style={{marginTop:"0px", marginBottom:"0px", width:"auto"}}>
            {books.map((book) => (
              <Grid item key={book.bok_id} xs={10} sm={4} md={3}>
                <Book
                  title={book.tittel}
                  author={book.navn}
                  year={book.aar}
                  genre={book.sjanger}
                  picture={book.bilde}
                  avg_rating={book.avg_verdi}
                  bookID={book.bok_id}
                ></Book>
                {/* #TODO Her kom å legge til infoen fra hver bok */}
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom></Typography>
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
