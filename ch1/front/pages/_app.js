// _app.js의 특징은 아래에 있는 index.js, profile.js, signup.js가 부모컴포넌트로 사용
// _app.js 안에다가 공통적인 부분을 모은다.
import React from 'react';
import Head from 'next/head';
import Proptypes from 'prop-types';
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

// 부모로부터 내려온 props를 검증
// 프로그래밍이 안정적이고 견고해짐
// 자체 props를 잘못 전달하는 에러를 표시해줌
ChoWitter.proptypes = {
    Component: Proptypes.elementType, // elementType: 컴포넌트식의 props
};

export default ChoWitter;