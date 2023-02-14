import pool from "./mysql-pool";

class ReadRaterService {
  //utgangspunkt for databasekall
  getAllBooks() {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM bok", (error, results) => {
        if (error) return reject(error);

        resolve(results);
      });
    });
  }
}

const readRaterService = new ReadRaterService();
export default readRaterService;
