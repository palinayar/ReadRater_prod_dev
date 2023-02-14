const express = require("express");
const app = express();

app.get("/api", (request, response) => {
  response.json({ books: ["Book1", "Book2", "Book3"] });
});

//Server running on port 5000, react app on port 3000
const port = 5000;
app.listen(port, () => {
  console.info(`Server running on port ${port}`);
});

 