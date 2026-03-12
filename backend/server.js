require('dotenv').config();
const express = require('express');
const cors = require('cors');
const DB = require('./db');
const app = express();

const productRoute = require('./routes/productRoutes');
const imageRoute = require('./routes/imageRoutes');
const userRoute = require('./routes/userRoutes');
const orderRoute = require('./routes/orderRoutes');
const adminUser = require('./routes/adminUserRoutes');

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use(imageRoute);
app.use(productRoute);
app.use(userRoute);
app.use(orderRoute);
app.use(adminUser);

app.listen(5000, () => {
  console.log('App is running');
});
