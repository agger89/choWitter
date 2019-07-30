import React, { useState, useCallback, useEffect } from 'react';
import { Button, Input, Form } from 'antd';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CommentForm = ({ post }) => {
  const [commentText, setCommentText] = useState();
  const { commentAdded, isAddingComment } = useSelector(state => state.post);
  const { me } = useSelector(state => state.user);
  const dispatch = useDispatch();

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
    <Form onSubmit={onSubmitComment}>
      <Form.Item>
        <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={isAddingComment}>삐약</Button>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
