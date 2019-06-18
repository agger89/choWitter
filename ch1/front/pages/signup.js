import React, { useState } from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import { Form, Input, Checkbox, Button } from 'antd';

const Signup = () => {
    const [id, setId] = useState('');
    const [nick, setNick] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);
    const [passwordError, setPasswordError] = useState(false); // 비번 다름 에러 
    const [termError, setTermError] = useState(false); // 약관동의 안하면 에러

    const onSubmit = (e) => {
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
    };

    const onChangeId = (e) => {
        setId(e.target.value);
    };
    
    const onChangeNick = (e) => {
        setNick(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onChangePasswordCheck = (e) => {
        setPasswordError(e.target.value !== password); // 조건이 맞으면 true 발생해서 메시지 출력
        setPasswordCheck(e.target.value);
    };

    const onChangeTerm = (e) => {
        setTermError(false);
        setTerm(e.target.checked);
    };

    return (
        <>
            <Head>
                <title>choWitter</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.19.0/antd.css" />
            </Head>
            <AppLayout>
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
            </AppLayout>
        </>
    );
};

export default Signup;