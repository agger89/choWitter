import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_HASHTAG_POSTS_REQUEST, LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../containers/PostCard';

// 해시태그 클릭시 오는 페이지
const Hashtag = ({ tag }) => {
  const { mainPosts, hasMorePost } = useSelector(state => state.post);
  const dispatch = useDispatch();

  // SSR 적용위해 아래 getInitialProps로 코드이동
  // useEffect(() => {
  //   // 해시태그와 연관된 포스트 가져오기
  //   dispatch({
  //     type: LOAD_HASHTAG_POSTS_REQUEST,
  //     data: tag,
  //   });
  // }, []);

  const onScroll = useCallback(() => {
    // window.scrollY: 스크롤 내린 거리
    // document.documentElement.clientHeight: 현재 화면 높이
    // document.documentElement.scrollHeight: 전체 화면 길이
    // 스크롤이 제일 아래로 가기전 300px 전에 dispatch
    if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
      // hasMorePost:
      // reducer에서 가공한 게시물 더보여주기 활성화 스크롤
      // 더불러올게 있을때만 dispatch
      if (hasMorePost) {
        dispatch({
          type: LOAD_MAIN_POSTS_REQUEST,
          // 마지막 게시글의 id
          lastId: mainPosts[mainPosts.length - 1].id,
          data: tag,
        });
      }
    }
  }, [hasMorePost, mainPosts.length]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
    // onScroll 함수안에서 state를 사용하기떄문에 아래에 넣어준다
  }, [mainPosts.length]);

  return (
    <div>
      {mainPosts.map(c => (
        <PostCard key={c.id} post={c} />
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
