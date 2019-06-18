import React from 'react';
import Link from 'next/link';
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

export default AppLayout;