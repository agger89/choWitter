import React, { useState, useCallback, useEffect } from 'react';
import {
  Form, Input, Checkbox, Button,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { signUpRequestAction } from '../reducers/user';

const Signup = () => {
  const [id, setId] = useState('');
  const [nick, setNick] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false); // 비번 다름 에러
  const [termError, setTermError] = useState(false); // 약관동의 안하면 에러
  const dispatch = useDispatch();
  const { isSigningUp, me } = useSelector(state => state.user);

  // useEffct:
  // componentDidMount, componentDidUpdate, componentWillUnmount
  // 를 하나로 합쳐놓은것
  useEffect(() => {
    if (me) {
      alert('로그인 했으니 메인 페이지로 이동합니다.');
      Router.push('/');
    }
  }, [me && me.id]); // me.id 값이 있으면 Router.push('/'), 배열에 값이 있으면 componentDidUpdate

  // 함수 컴포넌트는 state가 바뀔때 마다 전체가 리렌더링 되기 때문에
  // 해당 이벤트만 리렌더링 되게 하기 위해
  // 자식 컴포넌트에 전달하는 함수들은 useCallback으로 감싸준다
  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    // 비밀번호와 비밀번호체크가 일치하지 않으면
    // passwordError를 true로 변경시켜 메시지 출력
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    // 약관동의가 안되어 있으면
    // termError를 true로 변경시켜 메시지 출력
    if (!term) {
      return setTermError(true);
    }
    // redux에서 동적으로 만들었던 signUpAction 함수에 인자로 아래의 값들을 넣어줌
    dispatch(signUpRequestAction({
      id,
      password,
      nick,
    }));
    // 객체 스타일로 콘솔찍는 방법
    console.log({
      id, nick, password, passwordCheck, term,
    });
    // useCallback을 사용하려면 아래 배열에 지금 함수에서 사용하는 state값을 넣어야된다
  }, [password, passwordCheck, term]);

  // 보통 form 이벤트들은 redux state로 처리하지 않고
  // 그냥 react state로 처리한다
  // 이유는 일일히 액션을 다생성해줘야되고
  // onChange 될떄마다 액션이 발생해서 그렇다
  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);

  const onChangeNick = useCallback((e) => {
    setNick(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordError(e.target.value !== password); // 조건이 맞으면 true 발생해서 메시지 출력
    setPasswordCheck(e.target.value);
  }, [password]);

  const onChangeTerm = useCallback((e) => {
    setTermError(false);
    setTerm(e.target.checked);
  }, []);

  return (
    <>
      <Form onSubmit={onSubmitForm} style={{ padding: 10 }}>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          {/* required: 입력 필수값 */}
          <Input name="user-id" value={id} required onChange={onChangeId} />
        </div>
        <div>
          <label htmlFor="user-nick">닉네임</label>
          <br />
          <Input name="user-nick" value={nick} required onChange={onChangeNick} />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input name="user-password" value={password} type="password" required onChange={onChangePassword} />
        </div>
        <div>
          <label htmlFor="user-password-chk">비밀번호체크</label>
          <br />
          <Input name="user-password-chk" value={passwordCheck} type="password" required onChange={onChangePasswordCheck} />
          {passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}
        </div>
        <div>
          <Checkbox name="user-term" value={term} onChange={onChangeTerm}>동의합니다.</Checkbox>
          {termError && <div style={{ color: 'red' }}>약관에 동의하셔야 합니다.</div>}
        </div>
        <div style={{ marginTop: 10 }}>
          {/* button type="submit" 대체 */}
          <Button type="primary" htmlType="submit" loading={isSigningUp}>가입하기</Button>
        </div>
      </Form>
    </>
  );
};

export default Signup;
