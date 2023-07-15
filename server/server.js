const router = require('./routes/auth-routes');
const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(router);

const uri = mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('db started'));

app.listen(8000, () => {
  console.log('server started on port 8000');
});
