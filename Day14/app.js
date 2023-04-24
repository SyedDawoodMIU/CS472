const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());

let books = [
  {
    id: uuidv4(),
    title: "Book 1",
    description: "This is Book 1",
    price: 10.99,
  },
  {
    id: uuidv4(),
    title: "Book 2",
    description: "This is Book 2",
    price: 15.99,
  },
];

app.get("/books", (req, res) => {
  res.json(books);
});

app.post("/books", (req, res) => {
  const { title, description, price } = req.body;

  if (!title || !description || !price) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newBook = {
    id: uuidv4(),
    title,
    description,
    price,
  };
  books.push(newBook);
  res.json(newBook);
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const { title, description, price } = req.body;

  if (!title || !description || !price) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const bookIndex = books.findIndex((book) => book.id === bookId);
  if (bookIndex !== -1) {
    books[bookIndex] = {
      ...books[bookIndex],
      title,
      description,
      price,
    };
    res.json(books[bookIndex]);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const bookIndex = books.findIndex((book) => book.id === bookId);
  if (bookIndex !== -1) {
    const deletedBook = books.splice(bookIndex, 1)[0];
    res.json(deletedBook);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
