import React, { useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { FOLLOW_USER_REQUEST, UNFOLLOW_USER_REQUEST } from '../reducers/user';

const FollowButton = memo(({ post }) => {
  const { me } = useSelector(state => state.user)
  const dispatch = useDispatch();
  // 아래 onClick함수 괄호안에 값이 있으면 고차함수 사용 userId => () => {}
  const onFollow = useCallback(userId => () => {
    dispatch({
      type: FOLLOW_USER_REQUEST,
      data: userId,
    });
  }, []);

  const onUnfollow = useCallback(userId => () => {
    dispatch({
      type: UNFOLLOW_USER_REQUEST,
      data: userId,
    });
  }, []);

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
