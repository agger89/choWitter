// _app.js의 특징은 아래에 있는 index.js, profile.js, signup.js가 부모컴포넌트로 사용
// _app.js 안에다가 공통적인 부분을 모은다.
import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
// 리액트를 리덕스와 연결
import withRedux from 'next-redux-wrapper';
import AppLayout from '../components/AppLayout';
import { createStore } from 'redux';
// Provider: 리덕스 state를 컴포넌트들에게 제공해준다.
import { Provider } from 'react-redux';
import reducer from '../reducers';

const ChoWitter = ({ Component, store }) => {
    return (
        // Provider가 부모 컴포넌트이고 store를 가지고 있기 때문에
        // 자식 컴포넌트들은 store에 있는 state를 받을수 있다
        // store: state, action, reducer가 합쳐진것
        <Provider store={store}>
            <Head>
                <title>choWitter</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.19.0/antd.css" />
            </Head>
            <AppLayout>
                <Component />{/* next에서 넣어주는 props(index.js, profile.js, signup.js) */}
            </AppLayout>
        </Provider>
    );
};

// 부모로부터 내려온 props를 검증
// 프로그래밍이 안정적이고 견고해짐
// 자체 props를 잘못 전달하는 에러를 표시해줌
ChoWitter.propTypes = {
    Component: PropTypes.elementType, // elementType: 컴포넌트식의 props
    store: PropTypes.object,
};

// react를 redux에 연결
export default withRedux((initialState, options) => {
    const store = createStore(reducer, initialState);
    return store;
})(ChoWitter);