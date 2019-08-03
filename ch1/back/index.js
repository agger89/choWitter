const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const hpp = require('hpp');
const helmet = require('helmet');
const https = require('https');
const http = require('http');

const passportConfig = require('./passport');
const db = require('./models');
const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');
const hashtagAPIRouter = require('./routes/hashtag');

const prod = process.env.NODE_ENV === 'production';

dotenv.config();
const app = express();
db.sequelize.sync();
passportConfig();

if (prod) {
  app.use(hpp());
  app.use(helmet());
  app.use(morgan('combined'));
  app.use(cors({
    origin: 'http://starcho.com',
    credentials: true,
  }));
} else {
  // 요청에 대한 로그 남기기
  app.use(morgan('dev'));
  // CORS 에러 해결 (외부 서버 요청 차단 방지)
  app.use(cors({
    // 다른 도메인간 프론트와 쿠키 교환 할수 있게
    origin: true,
    credentials: true,
  }));
}

app.use('/', express.static('uploads'));
// json 데이터 형식 처리
app.use(express.json());
// form 데이터 형식 처리
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
  resave: false, // 매번 세션 강제 저장
  saveUninitialized: false, // 빈 값도 저장
  secret: process.env.COOKIE_SECRET, // 쿠키 암호화
  cookie: {
    httpOnly: true, // javascript로 접근 못하게
    secure: false, // https를 쓸 때 true
    domain: prod && '.starcho.com', // 프론트, 백엔드 쿠키 통일
  },
  // 보안을 위해 쿠키 이름 변경
  name: 'rnbck',
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('react chowitter 백엔드 정상 동작!');
});

// API: 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구
app.use('/api/user', userAPIRouter);
app.use('/api/post', postAPIRouter);
app.use('/api/posts', postsAPIRouter);
app.use('/api/hashtag', hashtagAPIRouter)

app.listen(prod ? process.env.PORT : 3065, () => {
    console.log(`server is running on ${process.env.PORT}`);
});