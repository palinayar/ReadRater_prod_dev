const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

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
        "SELECT Bok.bok_id, Bok.tittel, Bok.sjanger, Bok.bilde, Bok.aar, Forfatter.navn, AVG(Rangering.verdi) as avg_verdi" +
        " FROM Bok JOIN Forfatter ON Forfatter.forfatter_id = Bok.forfatter_id JOIN Rangering" +
        " ON Bok.bok_id = Rangering.bok_id GROUP BY Bok.bok_id ORDER BY avg_verdi DESC",
        (error, results) => {
          if (error) return reject(error);

          resolve(results);
        }
      );
    });
  }
  addRating(verdi, vurdering, bok_id, bruker_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO Rangering (verdi, vurdering, bok_id, bruker_id) VALUES (?,?,?,?)",
        [verdi, vurdering, bok_id, bruker_id],
        (error, results) => {
          if (error) return reject(error);

          resolve(results);
        }
      );
    });
  }

  addBook(tittel, sjanger, bilde, aar, forfatter_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO Bok (tittel, sjanger, bilde, aar, forfatter_id) VALUES (?,?,?,?,?)",
        [tittel, sjanger, bilde, aar, forfatter_id],
        (error, results) => {
          if (error) return reject(error);

          resolve(results.insertId);
        }
      );
    });
  }

  addAuthor(navn) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO Forfatter (navn) VALUES (?)",
        [navn],
        (error, results) => {
          if (error) return reject(error);

          resolve(results.insertId);
        }
      );
    });
  }

  logIn(brukernavn, passord) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT bruker_id, brukernavn, passord FROM Bruker WHERE brukernavn=? AND passord=?",
        [brukernavn, passord],
        (error, results) => {
          if (error) return reject(error);
          if (results.length == 0) return reject("Wrong username or password");

          resolve(results[0]);
        }
      );
    });
  }

  searchBooks(searchTerm) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT Bok.bok_id, Bok.tittel, Bok.sjanger, Bok.bilde, Bok.aar, Forfatter.navn, AVG(Rangering.verdi) as avg_verdi" +
        " FROM Bok JOIN Forfatter ON Forfatter.forfatter_id = Bok.forfatter_id JOIN Rangering" +
        " ON Bok.bok_id = Rangering.bok_id WHERE Bok.tittel LIKE ? OR Forfatter.navn LIKE ?" +
        " GROUP BY Bok.bok_id ORDER BY avg_verdi DESC",
        ["%" + searchTerm + "%", "%" + searchTerm + "%"],
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
// henter alle bøkene inkl. gjennomsnittelig rating.
app.get("/api/books", (_request, response) => {
  readRaterService
    .getAllBooks()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

// logger inn en bruker med gitt brukernavn og passord
app.get("/api/log_in/:brukernavn/:passord", (request, response) => {
  const brukernavn = request.params.brukernavn;
  const passord = request.params.passord;
  if (brukernavn.length != 0 && passord.length != 0) {
    readRaterService
      .logIn(brukernavn, passord)
      .then((rows) => response.send(rows))
      .catch((error) => response.status(500).send(error));
  } else {
    response.status(400).send("Missing properties");
  }
});

//legger til rating på en gitt bok med en gitt bruker_id
app.post("/api/rating", (request, response) => {
  const data = request.body;
  if (
    data.hasOwnProperty("verdi") &&
    data.hasOwnProperty("vurdering") &&
    data.hasOwnProperty("bruker_id") &&
    data.hasOwnProperty("bok_id")
  )
    readRaterService
      .addRating(data.verdi, data.vurdering, data.bok_id, data.bruker_id)
      .then(() => response.send("Rating added"))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send("Missing properties");
});

//legger til en bok
app.post("/api/books", (request, response) => {
  const data = request.body;
  if (
    data.hasOwnProperty("navn") &&
    data.hasOwnProperty("tittel") &&
    data.hasOwnProperty("sjanger") &&
    data.hasOwnProperty("bilde") &&
    data.hasOwnProperty("aar") &&
    data.hasOwnProperty("rangering") &&
    data.hasOwnProperty("bruker_id")
  )
    readRaterService
      .addAuthor(data.navn)
      .then((author_id) => {
        readRaterService
          .addBook(data.tittel, data.sjanger, data.bilde, data.aar, author_id)
          .then((book_id) => {
            readRaterService
              .addRating(
                data.rangering,
                "Tom vurdering",
                book_id,
                data.bruker_id
              )
              .then(() => response.send("Book added with author and rating"));
          })
          .catch((error) => response.send(error));
      })
      .catch((error) => response.status(500).send(error));
  else response.status(400).send("Missing properties");
});
