import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
// useSelector: 리듀서에 있는 state를 불러오기 위함
// useDispatch: dispatch를 사용하기 위함
import { useSelector, useDispatch } from 'react-redux';
// action 함수를 불러옴
import { logoutAction } from '../reducers/user';

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

const UserProfile = () => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    // 함수 컴포넌트는 state가 바뀔때 마다 전체가 리렌더링 되기 때문에
    // 해당 이벤트만 리렌더링 되게 하기 위해
    // 자식 컴포넌트에 전달하는 함수들은 useCallback으로 감싸준다
    const onLogout = useCallback(() => {
        dispatch(logoutAction)
    }, []);

    return (
        <Card
            actions={[
                <div key="twit">짹짹<br />{user.Post.length}</div>,
                <div key="following">팔로잉<br />{user.Followings.length}</div>,
                <div key="follower">팔로워<br />{user.Followers.length}</div>
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{user.nickname[0]}</Avatar>}
                title={user.nickname}
            />
            <Button onClick={onLogout}>로그아웃</Button>
        </Card>
    );
};

export default UserProfile;