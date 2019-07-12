import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../components/PostCard';

// 해시태그 클릭시 오는 페이지
const Hashtag = ({ tag }) => {
  console.log(tag);
  const dispatch = useDispatch();
  const { mainPosts } = useSelector(state => state.post);
  useEffect(() => {
    // 해시태그와 연관된 포스트 가져오기
    dispatch({
      type: LOAD_HASHTAG_POSTS_REQUEST,
      data: tag,
    });
  }, [tag]);
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

Hashtag.getInitialProps = async (context) => {
  console.log('hashtag getInitialProps', context.query.tag);
  // 서버에서 데이터 보내서 getInitialProps거쳐서 Hashtag에 props로 전달
  return { tag: context.query.tag };
};

export default Hashtag;
