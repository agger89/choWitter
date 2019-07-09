const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const db = require('./models');
const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');

const app = express();
db.sequelize.sync();

// 요청에 대한 로그 남기기
app.use(morgan('dev'));
// json 데이터 형식 처리
app.use(express.json());
// form 데이터 형식 처리
app.use(express.urlencoded({ extended: true }));
// CORS 에러 해결 (외부 서버 요청 차단 방지)
app.use(cors());

// API: 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구
app.use('/api/user', userAPIRouter);
app.use('/api/post', postAPIRouter);
app.use('/api/posts', postsAPIRouter);

app.listen(3065, () => {
    console.log('server is running on http://localhost:3065');
});