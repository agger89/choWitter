import React, { useState, useCallback, memo } from 'react';
import
{
  Button, Card, Icon, Avatar, List, Comment, Popover,
} from 'antd';
import moment from 'moment';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  LOAD_COMMENTS_REQUEST,
  UNLIKE_POST_REQUEST, LIKE_POST_REQUEST,
  RETWEET_REQUEST,
  REMOVE_POST_REQUEST,
  INPUT_FOCUS_TRUE,
} from '../reducers/post';

import PostImages from '../components/PostImages';
import PostCardContent from '../components/PostCardContent';
import { FOLLOW_USER_REQUEST, UNFOLLOW_USER_REQUEST } from '../reducers/user';
import CommentForm from './CommentForm';
import FollowButton from '../components/FollowButton';

// 날짜
moment.locale('ko');

const PostCard = memo(({ post }) => {
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  // const me 에서 const id 로 변경
  // me 객체를 불러와서 사용할시 me 객체안에 어떤 값이 변경되면
  // 전체가 리렌더링 되는 문제점이 있다
  // 그래서 여기선 me.id 가 필요하니까 id만 꺼내서 사용
  const id = useSelector(state => state.user.me && state.user.me.id);
  const dispatch = useDispatch();

  // 로그인한 유저 &&
  // 좋아요가 선택되어있는 게시글 &&
  // 그 게시글에 유저 아이디와 내 아이디가 같으면
  const liked = id && post.Likers && post.Likers.find(v => v.id === id);

  const onToggleComment = useCallback(() => {
    // 이전 state 값과 다르게 현재값을 넣어줌
    setCommentFormOpened(prev => !prev);
    // 댓글창이 닫혀있을떄 댓글 불러오기
    if (!commentFormOpened) {
      dispatch({
        type: LOAD_COMMENTS_REQUEST,
        data: post.id,
      });
    }
  }, []);

  // 좋아요 토글
  const onToggleLike = useCallback(() => {
    if (!id) {
      alert('로그인이 필요합니다.');
      return dispatch({
        type: INPUT_FOCUS_TRUE,
      });
    }
    // 이미 좋아요 눌렀으면
    if (liked) {
      dispatch({
        type: UNLIKE_POST_REQUEST,
        data: post.id,
      });
      // 좋아요 안눌렀으면
    } else {
      dispatch({
        type: LIKE_POST_REQUEST,
        data: post.id,
      });
    }
  }, [id, post && post.id, liked]);

  // 리트윗
  const onRetweet = useCallback(() => {
    if (!id) {
      alert('로그인이 필요합니다.');
      return dispatch({
        type: INPUT_FOCUS_TRUE,
      });
    }
    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [id, post && post.id]);

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

  const onRemovePost = useCallback(userId => () => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: userId,
    });
  }, []);
  
  return (
    <div>
      <Card
        cover={post.Images && post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <Icon type="retweet" key="retweet" onClick={onRetweet} title="리트윗" />,
          <Icon
            type="heart"
            key="heart"
            theme={liked ? 'twoTone' : 'outlined'}
            twoToneColor="#eb2f96"
            onClick={onToggleLike}
            title={liked ? '좋아요 취소' : '좋아요'}
          />,
          <Icon type="message" key="message" onClick={onToggleComment} title="댓글" />,
          <Popover
            key="ellipsis"
            content={(
              <Button.Group>
                {id && post.UserId === id
                  ? (
                    <>
                      {/* <Button>수정</Button> */}
                      <Button type="danger" onClick={onRemovePost(post.id)}>삭제</Button>
                    </>
                  )
                  : <Button>신고(기능없음)</Button>}
              </Button.Group>
            )}
          >
            <Icon type="ellipsis" />
          </Popover>,
        ]}
        title={post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null}
        extra={<FollowButton post={post} onUnfollow={onUnfollow} onFollow={onFollow} />}
      >
        {post.RetweetId && post.Retweet
          ? (
            // 리트윗 포스트
            <Card
              cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}
            >
              <span style={{ float: 'right' }}>{moment(post.createdAt).format('YYYY.MM.DD')}</span>
              <Card.Meta
                // query: 주소뒤에 붙는 파라미터라고 생각하면 됨
                // as: 주소창에 서버주소처럼 보여주겠다는 의미 ex:) /user/1
                // /user, /hashtag는 express에서 불러오게 만들었기 때문에
                avatar={(
                  <Link href={{ pathname: '/user', query: { id: post.Retweet.User.id } }} as={`/user/${post.Retweet.User.id}`}>
                    <a><Avatar>{post.Retweet.User.nickname[0]}</Avatar></a>
                  </Link>
                )}
                title={post.Retweet.User.nickname}
                description={<PostCardContent postData={post.Retweet.content} />}
              />
            </Card>
          )
          : (
            <>
              <span style={{ float: 'right' }}>{moment(post.createdAt).format('YYYY.MM.DD')}</span>
              <Card.Meta
                avatar={(
                  <Link href={{ pathname: '/user', query: { id: post.User.id } }} as={`/user/${post.User.id}`}>
                    <a><Avatar>{post.User.nickname[0]}</Avatar></a>
                  </Link>
                )}
                title={post.User.nickname}
                description={<PostCardContent postData={post.content} />}
              />
            </>
          )
        }
      </Card>
      {commentFormOpened && (
        <>
          <CommentForm post={post} />
          <List
            header={`${post.Comments ? post.Comments.length : 0} 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments || []}
            renderItem={item => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={(
                    <Link href={{ pathname: '/user', query: { id: item.User.id } }} as={`/user/${item.User.id}`}>
                      <a><Avatar>{item.User.nickname[0]}</Avatar></a>
                    </Link>
                  )}
                  content={item.content}
                />
              </li>
            )}
          />
        </>
      )}
    </div>
  );
});

PostCard.propTypes = {
  // shape: 객체들을 정의 post.User, post.content ...
  post: PropTypes.shape({
    User: PropTypes.object,
    content: PropTypes.string,
    img: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};

export default PostCard;
