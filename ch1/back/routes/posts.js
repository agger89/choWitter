const express = require('express');
const db = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /api/posts
    try {
      let where = {};
      // lastId가 있으면 그아이디 보다 작은것들을 불러온다
      // 아니면 그냥 첫번쨰 게시물 부터 불러온다
      if (parseInt(req.query.lastId, 10)) {
        where = {
          id: {
            [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10), // less than
          },
        };
      }
      const posts = await db.Post.findAll({
        where,
        include: [{
          model: db.User,
          attributes: ['id', 'nickname'],
        }, {
          model: db.Image,
        }, {
          model: db.User,
          through: 'Like',
          as: 'Likers',
          attributes: ['id'],
        }, {
          model: db.Post,
          as: 'Retweet',
          include: [{
            model: db.User,
            attributes: ['id', 'nickname'],
          }, {
            model: db.Image,
          }],
        }],
        order: [['createdAt', 'DESC']], // DESC는 내림차순, ASC는 오름차순
        limit: parseInt(req.query.limit, 10),
      });
      res.json(posts);
    } catch (e) {
      console.error(e);
      next(e);
    }
  });

module.exports = router;