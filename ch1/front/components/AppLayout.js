import React from 'react';
import Link from 'next/link'; // 라우팅
import PropTypes from 'prop-types';
import { Menu, Input, Button } from 'antd';

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
            <Link href="/signup">
                <a><Button>회원가입</Button></a>
            </Link>
            {/* {children}: Home 컴포넌트에 AppLayout에 자식들을 가져온다 */}
            {children} 
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