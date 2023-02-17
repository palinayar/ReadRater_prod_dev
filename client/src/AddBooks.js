import React, { useState } from "react";
import { ThemeProvider, createTheme, makeStyles } from "@material-ui/core/styles";
import {
    TextField,
    Button,
    Box,
    Typography,
    Container
} from "@material-ui/core";
import bookIcon from "./images/book-icon.png";


const useStyles = makeStyles(theme => ({
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
    position: 'absolute',
    top: '50%',
    right: '-160px',
    transform: 'translate(0%,-50%)',
};

export default function Login() {
    const classes = useStyles();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Title: ${title}, Author: ${author}, Genre: ${genre}`);
        // You would typically make a network call here to authenticate the user
    };

    return (
        <ThemeProvider theme={theme}>
            <div style={{ marginTop: "50px" }}>
                <Container component="main" maxWidth="xs" style={{ position: 'relative', right: '100px' }}>
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
                                onChange={e => setTitle(e.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="author"
                                label="Author"
                                id="author"
                                autoComplete="current-password"
                                value={author}
                                onChange={e => setAuthor(e.target.value)}
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
                                onChange={e => setGenre(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Add Book
                            </Button>
                        </form>
                    </Box>
                    <img src={bookIcon} style={imagestyle} />
                </Container>
            </div>
        </ThemeProvider>
    );
}
