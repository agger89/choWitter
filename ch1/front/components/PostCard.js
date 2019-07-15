import React, { useState, useCallback, useEffect } from 'react';
import
{
  Button, Card, Icon, Avatar, Input, Form, List, Comment,
} from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_COMMENT_REQUEST, LOAD_COMMENTS_REQUEST } from '../reducers/post';

const PostCard = ({ post }) => {
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [commentText, setCommentText] = useState();
  const { me } = useSelector(state => state.user);
  const { commentAdded, isAddingComment } = useSelector(state => state.post);
  const dispatch = useDispatch();

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

  return (
    <div>
      <Card
        key={+post.createdAt}
        cover={post.Images[0] && <img alt="example" src={`http://localhost:3065/${post.Images[0].src}`} />}
        actions={[
          <Icon type="retweet" key="retweet" />,
          <Icon type="heart" key="heart" />,
          <Icon type="message" key="message" onClick={onToggleComment} />,
          <Icon type="ellipsis" key="ellipsis" />,
        ]}
        extra={<Button>팔로우</Button>}
      >
        <Card.Meta
          // href={{ pathname: '/user', query: { id: post.User.id } }}:
          // 새로고침 없이 프론트 페이지로 이동시키기 그 이유는
          // query: 주소뒤에 붙는 파라미터라고 생각하면 됨
          // as: 주소창에 서버주소처럼 보여주겠다는 의미 ex:) /user/1
          // /user, /hashtag는 express에서 불러오게 만들었기 때문에
          avatar={(
            <Link href={{ pathname: '/user', query: { id: post.User.id } }} as={`/user/${post.User.id}`}>
              <a><Avatar>{post.User.nickname[0]}</Avatar></a>
            </Link>
          )}
          title={post.User.nickname}
          description={(
            <div>
              {/* 등록된 글을 배열로 쪼갬 */}
              {post.content.split(/(#[^\s]+)/g).map((v) => {
                /* 등록된 글이 해시태그면 링크 태그로 변환 */
                if (v.match(/#[^\s]*/)) {
                  return (
                    <Link href={{ pathname: '/hashtag', query: { tag: v.slice(1) } }} as={`/hashtag/${v.slice(1)}`} key={v}><a>{v}</a></Link>
                  );
                }
                /* 일반 문자면 그냥 리턴 */
                return v;
              })}
            </div>
          )}
        />
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
