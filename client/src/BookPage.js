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
import { UserContext } from "./context.js";

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
const pageStyle = { backgroundColor: "#ffffff" };

export default function BookPage() {
  const [books, setBooks] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState();
  const [filteredBooks, setFilteredBooks] = useState([]);

  // const [rating, setRating] = useState();
  //This is how you fetch the data from the database, use in components
  useEffect(() => {
    readService
      .getAllBooks()
      .then((data) => {
        setBooks(data);
        setFilteredBooks(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

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

  const navigate = useNavigate();

  const addBook = () => {
    if (user) {
      navigate("add-new-book");
    } else {
      alert("You have to log in to add book!");
      navigate("login");
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
      <div style={pageStyle}>
        <ThemeProvider theme={theme}>
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
                  color="secondary"
                  style={{ color: "#2f5f2e" }}
                  onClick={() => navigate("login")}
                >
                  Login
                </Button>
              )}
            </Toolbar>
          </AppBar>
          <main>
            {/* Hero unit */}
            <Box
            >
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
                  color="text.primary"
                  gutterBottom
                >
                  Welcome to ReadRater!
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  display="inline-block"
                  width="150px"
                  onClick={addBook}
                >
                  Add book
                </Button>{" "}
                {/*#TODO Hvis bruker er logget inn: link til addbook-side. Om nei, til login-side */}
              </Container>
            </Box>
            <Box
            >
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
                    {books.map((book) => (
                      <MenuItem value={book.navn}>{book.navn}</MenuItem>
                    ))}
                    <ListSubheader>Genre</ListSubheader>
                    {books.map((book) => (
                      <MenuItem value={book.sjanger}>{book.sjanger}</MenuItem>
                    ))}
                    <ListSubheader>Year</ListSubheader>
                    {books.map((book) => (
                      <MenuItem value={book.aar}>{book.aar}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  variant="text"
                  color="secondary"
                  width="150px"
                  style={{ color: "#2f5f2e", marginTop: "25px", marginLeft: "5px" }}
                  onClick={addFilter}
                >
                  Add filter
                </Button>{" "}

                <TextField
                  variant="outlined"
                  margin="normal"
                  position="relative"
                  label="Search"
                  style={{ marginLeft: "370px" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Container>
            </Box>
            <Box
            >
              <Container sx={{ py: 4 }} maxWidth="md">
                {/* End hero unit */}
                <Grid
                  container
                  spacing={4}
                  style={{ marginTop: "30px", marginBottom: "0px", width: "auto" }}
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
        </ThemeProvider>
        {/* End footer */}
      </div>
    </>
  );
}
