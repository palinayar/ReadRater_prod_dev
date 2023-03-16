import React, { useState, useEffect, useContext } from "react";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListSubheader,
  TextField,
  Switch,
} from "@material-ui/core";
import Book from "./Book.js";
import bookIconW from "./images/book-icon_white.png";
import { useNavigate } from "react-router-dom";
import { testTheme, darkTheme, lightTheme } from "./theme.js";
import readService from "./service.js";
import { ThemeContext, UserContext } from "./context.js";

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
  const { user, setUser } = useContext(UserContext);
  const { setMode } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState();
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [distinctAuthors, setDistinctAuthors] = useState([]);
  const [distinctGenres, setDistinctGenres] = useState([]);
  const [distinctYears, setDistinctYears] = useState([]);
  const [switchValue, setSwitchValue] = useState(false);

  // const [rating, setRating] = useState();
  //This is how you fetch the data from the database, use in components
  useEffect(() => {
    readService
      .getAllBooks()
      .then((data) => {
        setBooks(data);
        setFilteredBooks(data);
        readService
          .getDistinctAuthors()
          .then((data) => {
            setDistinctAuthors(data);
          })
          .catch((error) => {
            console.log(error.message);
          });
        readService
          .getDistinctGenres()
          .then((data) => {
            setDistinctGenres(data);
          })
          .catch((error) => {
            console.log(error.message);
          });
        readService
          .getDistinctYears()
          .then((data) => {
            setDistinctYears(data);
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const navigate = useNavigate();

  const addBook = () => {
    if (user) {
      navigate("add-new-book");
    } else {
      alert("You have to log in to add book!");
      navigate("login");
    }
  };

  const handleSwitch = (event) => {
    setSwitchValue(event.target.checked);
    console.log(event.target.checked);
    if (event.target.checked) {
      //darkmode
      console.log("true");
      setMode(darkTheme);
    } else {
      //lightmode
      setMode(lightTheme);
    }
  };

  const handleFilter = (event) => {
    setFilterValue(event.target.value);
  };

  const addFilter = () => {
    let newArray = [];
    return books.filter((book) => {
      if (book.navn === filterValue) {
        newArray.push(book);
      }
      if (book.sjanger === filterValue) {
        newArray.push(book);
      }
      if (book.aar === filterValue) {
        newArray.push(book);
      }
      if (filterValue === "NONE") {
        newArray = books;
      }
      setFilteredBooks(newArray);
    });
  };

  const filterSearchedBooks = filteredBooks.filter((book) => {
    if (searchTerm) {
      const searchTermAsNumber = Number(searchTerm);
      if (isNaN(searchTermAsNumber)) {
        return (
          book.tittel.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.navn.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.sjanger.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else {
        return book.aar === searchTermAsNumber;
      }
    } else {
      return filteredBooks;
    }
  });

  return (
    <>
      <CssBaseline />
      <AppBar position="relative" style={{ height: appBarHeight }}>
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
              alt="book icon"
              style={{
                height: appBarHeight,
                position: "relative",
                boxSizing: "borderbox",
                padding: "10px",
              }}
            />
          </Box>
          <a href="/" style={{ color: "inherit", textDecoration: "none" }}>
            <Typography fontSize="26px" variant="h6" noWrap>
              ReadRater
            </Typography>
          </a>
          <Box style={{ flexGrow: "1" }}></Box>
          {user ? null : (
            <Button
              variant="contained"
              style={{ color: "#2f5f2e", marginRight: "20px" }}
              onClick={() => navigate("login")}
            >
              Login
            </Button>
          )}
          <Typography>LIGHT</Typography>
          <Switch
            checked={switchValue}
            onChange={handleSwitch}
            color="warning"
          />
          <Typography>DARK</Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box>
          <Container
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: 50,
            }}
          >
            <Typography
              style={{ marginBottom: "30px" }}
              component="h1"
              variant="h2"
              align="center"
              gutterBottom
            >
              Welcome to ReadRater!
            </Typography>
            <Button
              variant="contained"
              size="large"
              color="primary"
              display="inline-block"
              width="200px"
              onClick={addBook}
            >
              Add book
            </Button>{" "}
            {/*#TODO Hvis bruker er logget inn: link til addbook-side. Om nei, til login-side */}
          </Container>
        </Box>
        <Box>
          <Container maxWidth="md">
            <FormControl>
              <InputLabel>Filter</InputLabel>
              <Select
                label="Filter"
                value={filterValue}
                style={{ width: "200px", marginTop: "25px" }}
                onChange={handleFilter}
              >
                <MenuItem value="NONE">
                  <em>No filter</em>
                </MenuItem>
                <ListSubheader>Author</ListSubheader>
                {distinctAuthors.map((author) => (
                  <MenuItem value={author.navn}>{author.navn}</MenuItem>
                ))}
                <ListSubheader>Genre</ListSubheader>
                {distinctGenres.map((genre) => (
                  <MenuItem value={genre.sjanger}>{genre.sjanger}</MenuItem>
                ))}
                <ListSubheader>Year</ListSubheader>
                {distinctYears.map((year) => (
                  <MenuItem value={year.aar}>{year.aar}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="secondary"
              width="150px"
              style={{
                marginTop: "25px",
                marginLeft: "5px",
              }}
              onClick={addFilter}
            >
              Add filter
            </Button>{" "}
            <TextField
              variant="outlined"
              margin="normal"
              position="relative"
              label="Search"
              style={{ marginLeft: "350px" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Container>
        </Box>
        <Box>
          <Container sx={{ py: 4 }} maxWidth="md">
            {/* End hero unit */}
            <Grid
              container
              spacing={4}
              style={{
                marginTop: "30px",
                marginBottom: "0px",
                width: "auto",
              }}
            >
              {filterSearchedBooks.map((book) => (
                <Grid item key={book.bok_id} xs={10} sm={4} md={3}>
                  <Book
                    title={book.tittel}
                    author={book.navn}
                    year={book.aar}
                    genre={book.sjanger}
                    picture={book.bilde}
                    avg_rating={book.avg_verdi}
                    bookID={book.bok_id}
                    rateEnabled={true}
                  ></Book>
                  {/* #TODO Her kom å legge til infoen fra hver bok */}
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
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
