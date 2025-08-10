# ReadRater

ReadRater is a web application for book lovers to discover, rate, and review books. The platform allows users to browse a collection of books, filter and search by author, genre, or year, and add new books to the collection. Users can also rate books and view average ratings.

## Features

- **Browse Books:** View a list of books with details such as title, author, year, genre, cover image, and average rating.
- **Search & Filter:** Search for books by title, author, genre, or year. Filter the book list using dropdown menus.
- **Add Books:** Logged-in users can add new books to the collection.
- **User Authentication:** Login functionality to restrict certain actions (like adding books) to authenticated users.
- **Theme Switcher:** Toggle between light and dark mode for a personalized experience.
- **Responsive Design:** Clean and modern UI built with Material-UI, optimized for various devices.

## Project Structure

```
client/
  ├── public/
  └── src/
      ├── AddBooks.js
      ├── App.js
      ├── Book.js
      ├── BookPage.js
      ├── context.js
      ├── Login.js
      ├── RatingCard.js
      ├── service.js
      ├── theme.js
      └── images/
server/
  └── server.js
db-script.txt
ER-diagram-RR.png
README.md
```

- **client/**: React frontend application.
- **server/**: Backend server (Node.js/Express).
- **db-script.txt**: Database schema or setup script.
- **ER-diagram-RR.png**: Entity-Relationship diagram for the database.

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm

### Installation

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd pu-team-36
   ```

2. **Install dependencies:**
   - For the server:
     ```sh
     cd server
     npm install
     ```
   - For the client:
     ```sh
     cd ../client
     npm install
     ```

3. **Set up the database:**
   - Use the `db-script.txt` to create and populate your database.

4. **Start the server:**
   ```sh
   cd ../server
   npm start
   ```

5. **Start the client:**
   ```sh
   cd ../client
   npm start
   ```

6. **Open the app:**
   - Visit `http://localhost:3000` in your browser.

## Usage

- **Browse and search for books** on the main page.
- **Filter** by author, genre, or year using the dropdown.
- **Add a new book** by logging in and clicking the "Add book" button.
- **Switch between light and dark mode** using the toggle in the header.

## Technologies Used

- React
- Material-UI
- Node.js
- Express
- (Database: see `db-script.txt` and ER diagram)

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)
