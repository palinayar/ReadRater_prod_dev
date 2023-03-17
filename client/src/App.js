import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import { UserContext, ThemeContext } from "./context";
import BookPage from "./BookPage";
import AddBooks from "./AddBooks";
import Login from "./Login";
import { ThemeProvider } from "@material-ui/core";
import { darkTheme, lightTheme } from "./theme";
import { modalClasses } from "@mui/material";

export const App = () => {
  const [user, setUser] = useState(false);
  const [mode, setMode] = useState(darkTheme);
  //trenger en context med enten true eller false
  //den bestemmer theme

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <ThemeContext.Provider value={{ mode, setMode }}>
          <ThemeProvider theme={mode}>
            <Routes>
              <Route exact path="/" element={<BookPage />} />
              <Route exact path="/login" element={<Login />} />
              <Route path="/add-new-book" element={<AddBooks />} />
            </Routes>
          </ThemeProvider>
        </ThemeContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
