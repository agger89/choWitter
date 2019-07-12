const express = require('express');
const next = require('next');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');

// 개발 모드
const dev = process.env.NODE_ENV !== 'production';
// 배포 모드
const prod = process.env.NODE_ENV === 'production';

const app = next({ dev });
const handle = app.getRequestHandler();
dotenv.config();

app.prepare().then(() => {
  const server = express();

  server.use(morgan('dev'));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cookieParser(process.env.COOKIE_SECRET));
  server.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }));

  server.get('/hashtag/:tag', (req, res) => app.render(req, res, '/hashtag', { tag: req.params.tag }));

  server.get('/user/:id', (req, res) => app.render(req, res, '/user', { id: req.params.id }));

  server.get('*', (req, res) => handle(req, res));

  server.listen(3060, () => {
    console.log('next+express running on port 3060');
  });
});
