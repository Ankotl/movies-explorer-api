require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');

const { MONGODB_ADRESS = '//localhost:27017/bitfilmsdb', PORT = 3010 } = process.env;

const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const handelError = require('./middlewares/handelError');
const { validationLogin, validationCreateUser } = require('./middlewares/validations');

const options = {
  origin: [
    'http://localhost:3000',
    'http://akotlyakov.kino.nomoredomains.club',
    'https://akotlyakov.kino.nomoredomains.club',
    'https://Ankotl.github.io',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

const app = express();

mongoose.connect(`mongodb:${MONGODB_ADRESS}`);

app.use(cors(options));
app.use(express.json());
app.use(requestLogger);
app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUser);
app.use(auth);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(handelError);
app.listen(PORT);
