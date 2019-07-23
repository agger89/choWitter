import React, { useState, useCallback, useEffect } from 'react';
import
{
  Button, Card, Icon, Avatar, Input, Form, List, Comment, Popover,
} from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  ADD_COMMENT_REQUEST, LOAD_COMMENTS_REQUEST,
  UNLIKE_POST_REQUEST, LIKE_POST_REQUEST,
  RETWEET_REQUEST,
  REMOVE_POST_REQUEST,
} from '../reducers/post';
import { FOLLOW_USER_REQUEST, UNFOLLOW_USER_REQUEST } from '../reducers/user';
import PostImages from './PostImages';
import PostCardContent from './PostCardContent';

const PostCard = ({ post }) => {
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [commentText, setCommentText] = useState();
  const { me } = useSelector(state => state.user);
  const { commentAdded, isAddingComment } = useSelector(state => state.post);
  const dispatch = useDispatch();

  // 로그인한 유저 &&
  // 좋아요가 선택되어있는 게시글 &&
  // 그 게시글에 유저 아이디와 내 아이디가 같으면
  const liked = me && post.Likers && post.Likers.find(v => v.id === me.id);

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

  const onSubmitComment = useCallback((e) => {
    // form은 무조건 preventDefault 해줘야 새로고침이 안된다.
    e.preventDefault();
    if (!me) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        postId: post.id,
        content: commentText,
      },
    });
    // useCallback은 기억력이 좋아서 위에 if (!me) 요기서 me를 최초 state 값인 null로 기억하기 떄문에
    // 아래처럼 [me && me.id] 새로 null이 아닌값을 넣어줘야 한다.
  }, [me && me.id, commentText]);

  // 댓글이 등록 되면 텍스트 입력창 초기화 작업
  // useEffct:
  // componentDidMount, componentDidUpdate, componentWillUnmount
  // 를 하나로 합쳐놓은것
  useEffect(() => {
    setCommentText('');
  }, [commentAdded === true]); // 댓글이 등록되면 setCommentText(''), 배열에 값이 있으면 componentDidUpdate

  const onChangeCommentText = useCallback((e) => {
    setCommentText(e.target.value);
  }, []);

  // 좋아요 토글
  const onToggleLike = useCallback(() => {
    if (!me) {
      return alert('로그인이 필요합니다.');
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
  }, [me && me.id, post && post.id, liked]);

  // 리트윗
  const onRetweet = useCallback(() => {
    if (!me) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [me && me.id, post && post.id]);

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
        key={+post.createdAt}
        cover={post.Images && post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <Icon type="retweet" key="retweet" onClick={onRetweet} />,
          <Icon
            type="heart"
            key="heart"
            theme={liked ? 'twoTone' : 'outlined'}
            twoToneColor="#eb2f96"
            onClick={onToggleLike}
          />,
          <Icon type="message" key="message" onClick={onToggleComment} />,
          <Popover
            key="ellipsis"
            content={(
              <Button.Group>
                {me && post.UserId === me.id
                  ? (
                    <>
                      <Button>수정</Button>
                      <Button type="danger" onClick={onRemovePost(post.id)}>삭제</Button>
                    </>
                  )
                  : <Button>신고</Button>}
              </Button.Group>
            )}
          >
            <Icon type="ellipsis" />
          </Popover>,
        ]}
        title={post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null}
        extra={
          // 로그인 안했을때 || 내 게시글일때
          !me || post.User.id === me.id
            ? null
            // 해당 게시글의 작성자가 내 팔로우 목록에 있으면
            : me.Followings && me.Followings.find(v => v.id === post.User.id)
              ? <Button onClick={onUnfollow(post.User.id)}>언팔로우</Button>
              : <Button onClick={onFollow(post.User.id)}>팔로우</Button>
        }
      >
        {post.RetweetId && post.Retweet
          ? (
            // 리트윗 포스트
            <Card
              cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}
            >
              <Card.Meta
                // href={{ pathname: '/user', query: { id: post.User.id } }}:
                // 새로고침 없이 프론트 페이지로 이동시키기 그 이유는
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
            <Card.Meta
              avatar={(
                <Link href={{ pathname: '/user', query: { id: post.User.id } }} as={`/user/${post.User.id}`}>
                  <a><Avatar>{post.User.nickname[0]}</Avatar></a>
                </Link>
              )}
              title={post.User.nickname}
              description={<PostCardContent postData={post.content} />}
            />
          )
        }
      </Card>
      {commentFormOpened && (
        <>
          <Form onSubmit={onSubmitComment}>
            <Form.Item>
              <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={isAddingComment}>삐약</Button>
          </Form>
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
};

PostCard.propTypes = {
  // shape: 객체들을 정의 post.User, post.content ...
  post: PropTypes.shape({
    User: PropTypes.object,
    content: PropTypes.string,
    img: PropTypes.string,
    createdAt: PropTypes.object,
  }).isRequired,
};

export default PostCard;
