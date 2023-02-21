const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

//Database connection setup
const mysql = require("mysql2");
let connection = mysql.createConnection({
  host: "mysql.stud.ntnu.no",
  user: "thomaeni_pu",
  password: "123",
  database: "thomaeni_pu_dev",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to mySQL host!");
});

//Server running on port 5000, react app on port 3000
const port = 5000;
app.listen(port, () => {
  console.info(`Server running on port ${port}`);
});

class ReadRaterService {
  //utgangspunkt for databasekall
  getAllBooks() {
    return new Promise((resolve, reject) => {
      //henter ut id, tittel, sjanger og navn på forfatter
      connection.query(
        "SELECT Bok.bok_id, Bok.tittel, Bok.sjanger, Forfatter.navn FROM Bok JOIN Forfatter ON Forfatter.forfatter_id = Bok.forfatter_id",
        (error, results) => {
          if (error) return reject(error);

          resolve(results);
        }
      );
    });
  }
}

const readRaterService = new ReadRaterService();

//API router
app.get("/api/books", (_request, response) => {
  readRaterService
    .getAllBooks()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

//This is how you fetch the data from the database, use in components
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
