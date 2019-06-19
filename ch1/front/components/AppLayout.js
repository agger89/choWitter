import React from 'react';
import Link from 'next/link'; // 라우팅
import PropTypes from 'prop-types';
import { Menu, Input, Row, Col, Card, Avatar } from 'antd';
import LoginForm from '../components/LoginForm';

// 백엔드에 데이터가 아직 없기때문에 
// 가짜 데이터를 만들어준다
const dummy = {
    nickname: '조니',
    Post: [],
    Followings: [],
    Followers: [],
    isLoggedIn: false
};

const AppLayout = ({ children }) => {
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="home"><Link href="/"><a>조위터</a></Link></Menu.Item>
                <Menu.Item key="profile"><Link href="/profile"><a>프로필</a></Link></Menu.Item>
                <Menu.Item key="mail">
                    <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
                </Menu.Item>
            </Menu>
            <Row>
                {/* 가로 전체 24 */}
                <Col xs={24} md={6}>
                    {dummy.isLoggedIn ?
                        <Card
                            actions={[
                                <div key="twit">짹짹<br />{dummy.Post.length}</div>,
                                <div key="following">팔로잉<br />{dummy.Followings.length}</div>,
                                <div key="follower">팔로워<br />{dummy.Followers.length}</div>
                            ]}
                        >
                            <Card.Meta
                                avatar={<Avatar>{dummy.nickname[0]}</Avatar>}
                                title={dummy.nickname}
                            />
                        </Card>
                        :
                        <LoginForm />
                    }
                </Col>
                <Col xs={24} md={12}>
                    {/* {children}: Home 컴포넌트에 AppLayout에 자식들을 가져온다 */}
                    {children} 
                </Col>
                <Col xs={24} md={6}>세번째</Col>
            </Row>
            
        </div>
    );
};

// 부모로부터 내려온 props를 검증
// 프로그래밍이 안정적이고 견고해짐
// 자체 props를 잘못 전달하는 에러를 표시해줌
AppLayout.propTypes = {
    children: PropTypes.node // node: jsx에 들어갈수있는 모든 것들 (문자, 태그, 숫자, 컴포넌트, 불리언, 함수, 객체 등등)
};

export default AppLayout;