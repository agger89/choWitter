import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Avatar } from 'antd';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../components/PostCard';

const User = ({ id }) => {
  console.log(id);
  const dispatch = useDispatch();
  const { mainPosts } = useSelector(state => state.post);
  const { userInfo } = useSelector(state => state.user);
  useEffect(() => {
    dispatch({
      type: LOAD_USER_POSTS_REQUEST,
      data: id,
    });
  }, [id]);
  return (
    <div>
      {userInfo
        ? (
          <Card
            actions={[
              <div key="twit">
                짹짹
                <br />
                {userInfo.Posts.length}
              </div>,
              <div key="following">
                팔로잉
                <br />
                {userInfo.Followings.length}
              </div>,
              <div key="follower">
                팔로워
                <br />
                {userInfo.Followers.length}
              </div>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
              title={userInfo.nickname}
            />
          </Card>
        )
        : null
      }
      {mainPosts.map(c => (
        <PostCard key={+c.createAt} post={c} />
      ))}
    </div>
  );
};

User.propTypes = {
  id: PropTypes.number.isRequired,
};

User.getInitialProps = async (context) => {
  console.log('hashtag getInitialProps', context.query.tag);
  // 서버에서 데이터 보내서 getInitialProps거쳐서 User에 props로 전달
  return { id: parseInt(context.query.id, 10) };
};

export default User;
