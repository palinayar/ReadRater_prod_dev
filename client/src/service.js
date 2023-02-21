import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api";

class ReadService {
  getAllBooks() {
    return axios.get("/books").then((response) => response.data);
  }
}

const readService = new ReadService();
export default readService;
