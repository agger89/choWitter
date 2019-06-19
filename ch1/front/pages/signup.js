import React, { useState, useCallback } from 'react'; 
import { Form, Input, Checkbox, Button } from 'antd';

const Signup = () => {
    const [id, setId] = useState('');
    const [nick, setNick] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);
    const [passwordError, setPasswordError] = useState(false); // 비번 다름 에러 
    const [termError, setTermError] = useState(false); // 약관동의 안하면 에러

    // 함수 컴포넌트는 state가 바뀔때 마다 전체가 리렌더링 되기 때문에
    // 자식 컴포넌트에 전달하는 함수들은 useCallback으로 감싸준다
    const onSubmit = useCallback((e) => {
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
        // 객체 스타일로 콘솔찍기
        console.log({ 
            id,nick,password,passwordCheck,term
        });
        // useCallback을 사용하려면 아래 배열에 지금 함수에서 사용하는 state값을 넣어야된다
    }, [password, passwordCheck, term]);

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
            <Form onSubmit={onSubmit} style={{ padding: 10 }} >
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
                <div style={{ marginTop:10 }}>
                    {/* button type="submit" 대체 */}
                    <Button htmlType="submit">가입하기</Button> 
                </div>
            </Form>
        </>
    );
};

export default Signup;