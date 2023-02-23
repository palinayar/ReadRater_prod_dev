import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api";

class ReadService {
  getAllBooks() {
    return axios.get("/books").then((response) => response.data);
  }

  addRating(verdi, vurdering, bruker_id, bok_id) {
    return axios
      .post("/rating", {
        verdi: verdi,
        vurdering: vurdering,
        bruker_id: bruker_id,
        bok_id: bok_id,
      })
      .then((response) => response.data);
  }

  logIn(brukernavn, passord) {
    return axios
      .get("/log_in/" + brukernavn + "/" + passord)
      .then((response) => response.data);
  }

  addBook(navn, tittel, sjanger, bilde, aar) {
    return axios
      .post("/books", {
        navn: navn,
        tittel: tittel,
        sjanger: sjanger,
        bilde: bilde,
        aar: aar,
      })
      .then((response) => response.data);
  }
}

const readService = new ReadService();
export default readService;
