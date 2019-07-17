import React, { useEffect, useCallback } from 'react';
import { List, Card, Icon } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import NicknameEditForm from '../components/NicknameEditForm';
import PostCard from '../components/PostCard';
import {
  LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, UNFOLLOW_USER_REQUEST,
  REMOVE_FOLLOWER_REQUEST,
} from '../reducers/user';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';

const Profile = () => {
  const dispatch = useDispatch();
  const { me, followingList, followerList } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);
  console.log(followingList, followerList);
  useEffect(() => {
    // 로그인 했을떄
    if (me) {
      // 팔로워 목록
      dispatch({
        type: LOAD_FOLLOWERS_REQUEST,
        data: me.id,
      });
      // 팔로잉 목록
      dispatch({
        type: LOAD_FOLLOWINGS_REQUEST,
        data: me.id,
      });
      // 내 게시글들
      dispatch({
        type: LOAD_USER_POSTS_REQUEST,
        data: me.id,
      });
    }
  }, [me && me.id]);

  // 언팔로우
  const onUnfollow = useCallback(userId => () => {
    dispatch({
      type: UNFOLLOW_USER_REQUEST,
      data: userId,
    });
  }, []);

  // 팔로워 삭제
  const onRemoveFollower = useCallback(userId => () => {
    dispatch({
      type: REMOVE_FOLLOWER_REQUEST,
      data: userId,
    });
  }, []);

  return (
    <div>
      <NicknameEditForm />
      <List
        style={{ marginBottom: '20px' }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>팔로잉 목록</div>}
        bordered
        dataSource={followingList}
        renderItem={item => (
          <List.Item style={{ marginTop: '20px' }}>
            {/* 배열안에 jsx 문법을 사용할때는 key를 꼭 적어야한다 */}
            <Card actions={[<Icon key="stop" type="stop" onClick={onUnfollow(item.id)} />]}>
              <Card.Meta description={item.nickname} />
            </Card>
          </List.Item>
        )}
      />
      <List
        style={{ marginBottom: '20px' }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>팔로워 목록</div>}
        bordered
        dataSource={followerList}
        renderItem={item => (
          <List.Item style={{ marginTop: '20px' }}>
            {/* 배열안에 jsx 문법을 사용할때는 key를 꼭 적어야한다 */}
            <Card actions={[<Icon key="stop" type="stop" onClick={onRemoveFollower(item.id)} />]}>
              <Card.Meta description={item.nickname} />
            </Card>
          </List.Item>
        )}
      />
      <div>
        {mainPosts.map(c => (
          <PostCard key={+c.createAt} post={c} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
