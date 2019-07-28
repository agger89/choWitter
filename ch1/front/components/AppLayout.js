import React, { useEffect } from 'react';
import Link from 'next/link'; // 라우팅
import PropTypes from 'prop-types';
import
{
  Menu, Input, Row, Col,
} from 'antd';
// useSelector: 리듀서에 있는 state를 불러오기 위함
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import LoginForm from '../containers/LoginForm';
import UserProfile from '../containers/UserProfile';
// import { LOAD_USER_REQUEST } from '../reducers/user';

// 백엔드에 데이터가 아직 없기때문에
// 가짜 데이터를 만들어준다
// 리덕스로 state 옮겨서 사용안함
// const dummy = {
//     nickname: '조니',
//     Post: [],
//     Followings: [],
//     Followers: [],
//     isLoggedIn: false
// };

const AppLayout = ({ children }) => {
  // useSelector: useState라고 생각하면 됨
  const { me } = useSelector(state => state.user);
  // 검색 이벤트
  const onSearch = (value) => {
    // pathname: '/hashtag', query: { tag: value } }: 내부적 주소
    // `/hashtag/${value}`: 눈으로 보이는 주소
    Router.push({ pathname: '/hashtag', query: { tag: value } }, `/hashtag/${value}`);
  };
  // SSR을 하기위해 아래 코드들 주석처리
  // _app.js에서 dispatch 할거임
  // const dispatch = useDispatch();
  // // 페이지가 첫 로드 될떄 유저 정보를 불러온다
  // // 로그인 쿠키가 남아있는 전제조건하에
  // useEffect(() => {
  //   if (!me) {
  //     dispatch({
  //       type: LOAD_USER_REQUEST,
  //     });
  //   }
  // }, []);
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home"><Link href="/"><a>조위터</a></Link></Menu.Item>
        <Menu.Item key="profile"><Link href="/profile"><a>프로필</a></Link></Menu.Item>
        <Menu.Item key="mail">
          <Input.Search
            enterButton
            style={{ verticalAlign: 'middle' }}
            onSearch={onSearch}
          />
        </Menu.Item>
      </Menu>
      <Row gutter={10}>
        {/* 가로 전체 24 */}
        <Col xs={24} md={6}>
          {me
            ? <UserProfile />
            : <LoginForm />
          }
        </Col>
        <Col xs={24} md={12}>
          {/* children: _app.js에 <AppLayout>안에 <Component />를 불러온다 */}
          {children}
        </Col>
        <Col xs={24} md={6}>
          <Link href="https://portfolio-ed26a.firebaseapp.com/">
            <a target="_blank">Made By Jonny</a>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

// 부모로부터 내려온 props를 검증
// 프로그래밍이 안정적이고 견고해짐
// 자체 props를 잘못 전달하는 에러를 표시해줌
AppLayout.propTypes = {
  children: PropTypes.node.isRequired, // node: jsx에 들어갈수있는 모든 것들 (문자, 태그, 숫자, 컴포넌트, 불리언, 함수, 객체 등등)
};

export default AppLayout;
