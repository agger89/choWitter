import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { Input, Button, Form } from 'antd';
// useDispatch: dispatch를 사용하기 위함
import { useDispatch } from 'react-redux';
// action 함수를 불러옴
import { loginAction } from '../reducers/user';

const LoginForm = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  // 함수 컴포넌트는 state가 바뀔때 마다 전체가 리렌더링 되기 때문에
  // 해당 이벤트만 리렌더링 되게 하기 위해
  // 자식 컴포넌트에 전달하는 함수들은 useCallback으로 감싸준다
  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    // 이벤트가 실행되면 reducer에 있는 loginAction 액션이 실행됨
    dispatch(loginAction);
  }, [id, password]);

  // 보통 form 이벤트들은 redux state로 처리하지 않고
  // 그냥 react state로 처리한다
  // 이유는 일일히 액션을 다생성해줘야되고
  // onChange 될떄마다 액션이 발생해서 그렇다
  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  return (
    <Form onSubmit={onSubmitForm} style={{ padding: '10px' }}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input name="user-password" value={password} onChange={onChangePassword} type="password" required />
      </div>
      <div>
        <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
        <Link href="/signup"><a><Button>회원가입</Button></a></Link>
      </div>
    </Form>
  );
};

export default LoginForm;
