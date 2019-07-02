import React, { useEffect } from 'react';
// useDispatch: dispatch를 사용하기 위함
// useSelector: 리듀서에 있는 state를 불러오기 위함
import { useDispatch, useSelector } from 'react-redux';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
// action 함수를 불러옴
import { loginRequestAction, logoutRequestAction } from '../reducers/user';

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
  // useDispatch: setState라고 생각하면 된다
  // const dispatch = useDispatch();
  // state안에 들어있는 isLoggedIn, user 를 구조분해로 정의해서 사용
  // useSelector: useState라고 생각하면 됨
  const { me, isLoggedIn } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);
  // useEffect(() => { // useEffct: 컴포넌트가 마운트 되었을때 실행되는 함수
  //   dispatch(loginRequestAction);
  //   dispatch(logoutRequestAction);
  // }, []);
  return (
    <div>
      {me ? (
        <div>
          로그인 했습니다:
          {' '}
          { me.nickname }
        </div>
      ) : <div>로그아웃 했습니다.</div>}
      {isLoggedIn && <PostForm />}
      {mainPosts.map(c => (
        <PostCard key={c} post={c} />
      ))}
    </div>
  );
};

export default Home;
