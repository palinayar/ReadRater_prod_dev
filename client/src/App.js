import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import { UserContext } from "./context";
import BookPage from "./BookPage";
import AddBooks from "./AddBooks";
import Login from "./Login";

export const App = () => {
  const [user, setUser] = useState(false);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route exact path="/" element={<BookPage />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/add-new-book" element={<AddBooks />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
