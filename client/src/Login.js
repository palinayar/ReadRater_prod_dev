import React, { useState } from "react";
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
import image from "./images/book-icon.png";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

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
    fontFamily: "book antiqua",
  },
});

const imagestyle = {
  position: "relative",
  bottom: "250px",
  left: "770px",
};

export default function Login() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);
    // You would typically make a network call here to authenticate the user
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ marginTop: "50px" }}>
        <Container
          component="main"
          maxWidth="xs"
          style={{ position: "relative", right: "100px" }}
        >
          <Box mt={5}>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
            </form>
          </Box>
        </Container>
        <img src={image} alt="ReadRater Logo" style={imagestyle} />
      </div>
    </ThemeProvider>
  );
}
