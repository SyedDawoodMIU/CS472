const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/image', (req, res) => {
  const imagePath = path.join(__dirname, 'pie.jpg');
 if (fs.existsSync(imagePath)) {
    const image = fs.readFileSync(imagePath);
    const extension = path.extname(imagePath).substring(1);
    res.setHeader('Content-Type', `image/${extension}`);
    res.send(image);
  } else {
    res.status(404).send('Image not found');
  }
});

app.get('/', (req, res) => {
    res.send('Welcome to Assignment 12');
    res.statusCode(200);
  });

app.get('/courses', (req, res) => {
  res.send('List of courses');
  res.statusCode(200);
});

app.post('/courses', (req, res) => {
  res.send('Creating a new course');
  res.statusCode(201);
});

app.get('/courses/:id', (req, res) => {
  res.send(`Course with ID is: ${req.params.id}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal server error');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

