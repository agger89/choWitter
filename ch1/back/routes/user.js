const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../models');

const router = express.Router();

router.get('/', (req, res) => {

});

router.post('/', async (req, res, next) => { // POST /api/user 회원가입
    try {
      // 유저가 이미 있는지 확인
      const exUser = await db.User.findOne({
        where: {
          // req.body.userId: front에서 요청보낸 유저 id
          userId: req.body.userId,
        },
      });
      if (exUser) {
        return res.status(403).send('이미 사용중인 아이디입니다.');
      }
      // bcrypt 암호화
      // salt는 10~13 사이로
      const hashedPassword = await bcrypt.hash(req.body.password, 12); 
      // 새로운 유저 생성 후 db에 저장
      const newUser = await db.User.create({
        nickname: req.body.nickname,
        userId: req.body.userId,
        password: hashedPassword,
      });
      console.log(newUser);
      // front로 새로운 유저 응답
      return res.status(200).json(newUser);
    } catch (e) {
      console.error(e);
      // 에러 처리를 여기서
      return next(e);
    }
  });

router.get('/:id', (req, res) => {

});

router.post('/logout', (req, res) => {

});

router.post('/login', (req, res) => {

});

router.get('/:id/follow', (req, res) => {

});

router.post('/:id/follow', (req, res) => {

});

router.delete('/:id/follow', (req, res) => {

});

router.delete('/:id/follower', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

module.exports = router;