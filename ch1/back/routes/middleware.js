// 로그인 했는지 체크하는 중복 코드 따로 분리
exports.isLoggedIn = (req, res, next) => {
    // 로그인했으면 다음코드로 넘어가게
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send('로그인이 필요합니다.');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
      next();
    } else {
      res.status(401).send('로그인한 사용자는 접근할 수 없습니다.');
    }
  };