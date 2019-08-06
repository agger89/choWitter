import React, { useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import PropTypes from 'prop-types';

const FollowButton = memo(({ post, onFollow, onUnfollow }) => {
  const { me } = useSelector(state => state.user);

  // 로그인 안했을때 || 내 게시글일때
  return !me || post.User.id === me.id
    ? null
    // 해당 게시글의 작성자가 내 팔로우 목록에 있으면
    : me.Followings && me.Followings.find(v => v.id === post.User.id)
      ? <Button onClick={onUnfollow(post.User.id)}>언팔로우</Button>
      : <Button onClick={onFollow(post.User.id)}>팔로우</Button>
});

FollowButton.prototype = {
  me: PropTypes.object,
  post: PropTypes.object.isRequired,
  onFollow: PropTypes.func.isRequired,
  onUnfollow: PropTypes.func.isRequired,
};

export default FollowButton;
