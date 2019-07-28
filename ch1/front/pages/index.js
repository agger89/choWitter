import React, { useEffect, useCallback, useRef } from 'react';
// useDispatch: dispatch를 사용하기 위함
// useSelector: 리듀서에 있는 state를 불러오기 위함
import { useDispatch, useSelector } from 'react-redux';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
// action 불러옴
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';

// 백엔드에 데이터가 아직 없기때문에
// 가짜 데이터를 만들어준다
// 리덕스로 옮겨서 사용안함
// const dummy = {
//     isLoggedIn: true,
//     imagePath: [],
//     mainPosts: [{
//         User: {
//             id: 1,
//             nickname: '조니',
//         },
//         content: '첫번째 게시글',
//         img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9xyT3SoXf5ojhRUHVUKafAo6z2QrnDvIpCn-ubRXskLozK1Mt_Q'
//     }]
// };

const Home = () => {
  // 이 컴포넌트가 첫번쨰 렌더링 될때
  // 아래의 dispatch도 같이 렌더링 된다.
  // state안에 들어있는 user 를 구조분해로 정의해서 사용
  // useSelector: useState라고 생각하면 됨

  const { me } = useSelector(state => state.user);
  const { mainPosts, hasMorePost } = useSelector(state => state.post);
  const dispatch = useDispatch();
  // 빈배열 생성
  // useRef로 배열 생성하는 이유는
  // 렌더링 시마다 배열이 초기화 되는걸 막기위해
  // 배열에 값이 들어가면 그 이후로는 초기화 되지 않는다.
  const countRef = useRef([]);

  // SSR을 하기위해 아래 코드들 주석처리
  // useDispatch: setState라고 생각하면 된다
  // useEffect(() => { // useEffct: 컴포넌트가 마운트 되었을때 실행되는 함수
  //   dispatch({
  //     type: LOAD_MAIN_POSTS_REQUEST,
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
        const lastId = mainPosts[mainPosts.length - 1].id;
        // 프론트 단에서 리덕스 액션 여러번 호출되는것 막기
        // 변수 countRef의 배열에 중복된 lastId가 없으면 dispatch
        if (!countRef.current.includes(lastId)) {
          dispatch({
            type: LOAD_MAIN_POSTS_REQUEST,
            // 마지막 게시글의 id
            lastId,
          });
          // 변수 countRef의 배열에 lastId를 넣어준다
          countRef.current.push(lastId);
        }
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
      {me && <PostForm />}
      {mainPosts.map(c => (
        <PostCard key={c.id} post={c} />
      ))}
    </div>
  );
};

// 부모 컴포넌트 app.js에
// ChoWitter.getInitialProps에서 받아온 props를 사용 context
Home.getInitialProps = async (context) => {
  // console.log(Object.keys(context));
  // 기존에 useEffect에서 dispatch 했던 액션을
  // SSR을 하기위해서 context.store에서 dispatch 해준다
  // 새로고침시 잠깐 빈페이지 나오는거 방지
  context.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST,
  });
};

export default Home;
