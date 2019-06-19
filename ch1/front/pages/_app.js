// _app.js의 특징은 아래에 있는 index.js, profile.js, signup.js가 부모컴포넌트로 사용
// _app.js 안에다가 공통적인 부분을 모은다.
import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';

const ChoWitter = ({ Component }) => {
    return (
        <>
            <Head>
                <title>choWitter</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.19.0/antd.css" />
            </Head>
            <AppLayout>
                <Component />{/* next에서 넣어주는 props(index.js, profile.js, signup.js) */}
            </AppLayout>
        </>
    );
};

export default ChoWitter;