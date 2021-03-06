const express = require('express');
const next = require('next');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

// 이 페이지는 동적인 결과 렌더링을 위해 만들어짐
// express가 next를 돌리는 구조

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
  // favicon 불러오기
  server.use('/', express.static(path.join(__dirname, 'public')));
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

  // 주소창에 게시글 아이디 입력시 페이지 렌더링 시켜주는 로직, post.js
  // /post/:id: 포스트 아이디의 경로( ex:) post/1 )
  server.get('/post/:id', (req, res) => {
    // { id: req.params.id }: 프론트에서 캐치 할수 있게
    return app.render(req, res, '/post', { id: req.params.id });
  });

  // 해시태그 클릭 및 검색시 페이지 렌더링 시켜주는 로직, hashtag.js
  // /hashtag/:tag: 해시태그의 텍스트 이름의 경로( ex:) hashtag/좋아요 )
  server.get('/hashtag/:tag', (req, res) => {
    // { tag: req.params.tag }: 프론트에서 캐치 할수 있게
    return app.render(req, res, '/hashtag', { tag: req.params.tag });
  });

  // 프로필 이미지 클릭시 페이지 렌더링 시켜주는 로직, user.js
  // /user/:id: 프로필 이미지의 유저아이디의 경로( ex:) user/1 )
  server.get('/user/:id', (req, res) => {
    // { id: req.params.id }: 프론트에서 캐치 할수 있게
    return app.render(req, res, '/user', { id: req.params.id });
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  // process.env.PORT: 배포용
  // 3060: 개발용
  server.listen(prod ? process.env.PORT : 3060, () => {
    console.log(`next+express running on port ${process.env.PORT}`);
  });
});
