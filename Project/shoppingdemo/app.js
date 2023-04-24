const express = require('express');
const cors = require('cors');
const productRouter = require('./routes/productRouter');
const authRoutes = require('./authRoutes');

const app = express();
app.use(cors());
app.use(express.json()); //req.body = {...}

app.use('/login', authRoutes);
app.use('/products', productRouter);


app.listen(5000, ()=>console.log('listen on 5000'));