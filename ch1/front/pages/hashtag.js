import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../components/PostCard';

// 해시태그 클릭시 오는 페이지
const Hashtag = ({ tag }) => {
  const { mainPosts } = useSelector(state => state.post);
  // SSR 적용위해 아래 getInitialProps로 코드이동
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   // 해시태그와 연관된 포스트 가져오기
  //   dispatch({
  //     type: LOAD_HASHTAG_POSTS_REQUEST,
  //     data: tag,
  //   });
  // }, []);
  return (
    <div>
      {mainPosts.map(c => (
        <PostCard key={+c.createAt} post={c} />
      ))}
    </div>
  );
};

Hashtag.propTypes = {
  tag: PropTypes.string.isRequired,
};

// 부모 컴포넌트 app.js에
// ChoWitter.getInitialProps에서 받아온 props를 사용 context
Hashtag.getInitialProps = async (context) => {
  const tag = context.query.tag;
  context.store.dispatch({
    type: LOAD_HASHTAG_POSTS_REQUEST,
    data: tag,
  });
  // 위에 props 사용가능
  return { tag };
};

export default Hashtag;
