const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

//Database setup
const mysql = require("mysql2");
let connection = mysql.createConnection({
  host: "mysql.stud.ntnu.no",
  user: "username",
  password: "password",
  database: "database_name",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

//Server running on port 5000, react app on port 3000
const port = 5000;
app.listen(port, () => {
  console.info(`Server running on port ${port}`);
});

class ReadRaterService {
  books = [
    { bok_id: 1, title: "Tittel på bok 1", genre: "comedy" },
    { bok_id: 2, title: "Tittel på bok 2", genre: "novel" },
    { bok_id: 3, title: "Tittel på bok 3", genre: "crime" },
  ];

  //utgangspunkt for databasekall
  getAllBooks() {
    return new Promise((resolve, _reject) => {
      connection.query("SELECT * FROM company", (error, results) => {
        if (error) return reject(error);

        resolve(results);
      });
    });
  }
}

const readRaterService = new ReadRaterService();

//router
app.get("/api/books", (_request, response) => {
  readRaterService
    .getAllBooks()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

//This is how you fetch the data from the database
// useEffect(() => {
//   readService
//     .getAllBooks()
//     .then((books) => {
//       console.log(books);
//     })
//     .catch((error) => {
//       console.log(error.message);
//     });
// }, []);
