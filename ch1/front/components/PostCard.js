import React, { useState, useCallback, useEffect } from 'react';
import
{
  Button, Card, Icon, Avatar, Input, Form, List, Comment,
} from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const PostCard = ({ post }) => {
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [commentText, setCommentText] = useState();
  const { me } = useSelector(state => state.user);
  const { commentAdded, isAddingComment } = useSelector(state => state.post);
  const dispatch = useDispatch();

  const onToggleComment = useCallback(() => {
    // 이전 state 값과 다르게 현재값을 넣어줌
    setCommentFormOpened(prev => !prev);
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
      },
    });
    // useCallback은 기억력이 좋아서 위에 if (!me) 요기서 me를 최초 state 값인 null로 기억하기 떄문에
    // 아래처럼 [me && me.id] 새로 null이 아닌값을 넣어줘야 한다.
  }, [me && me.id]);

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
        cover={post.img && <img alt="example" src={post.img} />}
        actions={[
          <Icon type="retweet" key="retweet" />,
          <Icon type="heart" key="heart" />,
          <Icon type="message" key="message" onClick={onToggleComment} />,
          <Icon type="ellipsis" key="ellipsis" />,
        ]}
        extra={<Button>팔로우</Button>}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={(
            <div>
              {/* 해시태그를 넣고 문자열을 배열로 쪼갬 */}
              {post.content.split(/(#[^\s]+)/g).map((v) => {
                /* 해시태그면 링크 태그로 변환 */
                if (v.match(/#[^\s]*/)) {
                  return (
                    <Link href="/hashtag" key={v}><a>{v}</a></Link>
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
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
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
