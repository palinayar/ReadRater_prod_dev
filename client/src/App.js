import React from 'react';

import { BrowserRouter as Router, Route, Link, NavLink, Routes, BrowserRouter } from 'react-router-dom';
import BookPage from './BookPage';
import AddBooks from './AddBooks'
import Login from './Login';


const App = () => {
    return (
        <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<BookPage/>}/>
                    <Route exact path="/login" element={<Login/>}/>
                    <Route path="/add-new-book" element={<AddBooks/>}/>
                </Routes>
        </BrowserRouter>
    )
}

export default App;
