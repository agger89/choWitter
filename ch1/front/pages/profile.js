import React, { useEffect, useCallback } from 'react';
import {
 List, Card, Icon, Button 
} from 'antd';
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
  const {
    me, followingList, followerList, hasMoreFollower, hasMoreFollowing,
  } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);
  // SSR 적용위해 아래 getInitialProps로 코드이동
  // useEffect(() => {
  //   // 로그인 했을떄
  //   if (me) {
  //     // 팔로워 목록
  //     dispatch({
  //       type: LOAD_FOLLOWERS_REQUEST,
  //       data: me.id,
  //     });
  //     // 팔로잉 목록
  //     dispatch({
  //       type: LOAD_FOLLOWINGS_REQUEST,
  //       data: me.id,
  //     });
  //     // 내 게시글들
  //     dispatch({
  //       type: LOAD_USER_POSTS_REQUEST,
  //       data: me.id,
  //     });
  //   }
  // }, [me && me.id]);

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

  // 더보기 버튼 클릭시 팔로잉 리스트 더 보여줌
  const loadMoreFollowings = useCallback(() => {
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
      // 현재 리스트 갯수를 action의 데이터로 보내줌
      // ex:)
      // 처음엔 offset이 0이므로 3명을 불러옴 그다음
      // 현재 리스트에 3명이 있으면 offset이 3이되면서 그다음 4~6까지 세명을 불러옴
      offset: followingList.length,
    });
  }, [followingList.length]);

  // 더보기 버튼 클릭시 팔로워 리스트 더 보여줌
  const loadMoreFollowers = useCallback(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
      offset: followerList.length,
    });
  }, [followerList.length]);

  return (
    <div>
      <NicknameEditForm />
      <List
        style={{ marginBottom: '20px' }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>팔로잉 목록</div>}
        // 더보기 유무
        loadMore={hasMoreFollowing && <Button style={{ width: '100%' }} onClick={loadMoreFollowings}>더 보기</Button>}
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
        // 더보기 유무
        loadMore={hasMoreFollower && <Button style={{ width: '100%' }} onClick={loadMoreFollowers}>더 보기</Button>}
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
          <PostCard key={c.id} post={c} />
        ))}
      </div>
    </div>
  );
};

Profile.getInitialProps = async (context) => {
  // store에 있는 state 가져옴
  const state = context.store.getState();
  // 프로필에서 SSR을 할떄 주의해야 할점이
  // dispatch 순서가
  // LOAD_USER_REQUEST가 먼저 실행되고 아래의 코드들이 실행 되는데
  // 아직 LOAD_USER_SUCCESS가 실행이 안되어서 me가 없기때문에 에러가난다
  // 그래서 saga에서 데이터 통신할때
  // axios.get(`/user/${userId || 0}/followers`, {})
  // userId || 0 이렇게 코드를 작성해주고
  // 서버에서는 0 이여도 데이터를 뿌려줄수 있게 셋팅해놓는다
  // UserId: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0

  // 팔로워 목록
  context.store.dispatch({
    type: LOAD_FOLLOWERS_REQUEST,
    data: state.user.me && state.user.me.id,
  });
  // 팔로잉 목록
  context.store.dispatch({
    type: LOAD_FOLLOWINGS_REQUEST,
    data: state.user.me && state.user.me.id,
  });
  // 내 게시글들
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: state.user.me && state.user.me.id,
  });
  // 여기서 LOAD_USER_SUCCESS 되서 me가 생김
};

export default Profile;
