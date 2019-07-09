const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../models');

// 로그인 로직
module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'userId',
    passwordField: 'password',
  }, async (userId, password, done) => {
    try {
      // 기존 사용자 유무
      const user = await db.User.findOne({ where: { userId } });
      // 아이디 없으면 
      if (!user) {
        return done(null, false, { reason: '존재하지 않는 사용자입니다!' });
      }
      // 아이디 있으면 비번 비교
      const result = await bcrypt.compare(password, user.password);
      // 비번 맞으면 user 정보 리턴
      if (result) {
        return done(null, user);
      }
      // 아이디 있는데 비번 틀리면
      return done(null, false, { reason: '비밀번호가 틀립니다.' });
    } catch (e) {
      console.error(e);
      return done(e);
    }
  }));
};