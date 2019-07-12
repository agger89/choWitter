// _app.js의 특징은 아래에 있는 index.js, profile.js, signup.js가 부모컴포넌트로 사용
// _app.js 안에다가 공통적인 부분을 모은다.
import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
// 리액트를 리덕스와 연결
import withRedux from 'next-redux-wrapper';
// Provider: 리덕스 state를 컴포넌트들에게 제공해준다.
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import AppLayout from '../components/AppLayout';
import reducer from '../reducers';
import rootSaga from '../sagas';


const ChoWitter = ({ Component, store, pageProps }) => (
  // Provider가 부모 컴포넌트이고 store를 가지고 있기 때문에
  // 자식 컴포넌트들은 store에 있는 state를 받을수 있다
  // store: state, action, reducer가 합쳐진것
  <Provider store={store}>
    <Head>
      <title>choWitter</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.19.0/antd.css" />
    </Head>
    <AppLayout>
      {/* next에서 _app.js는 props로 컴포넌트(<Component />)를 받는다(index.js, profile.js, signup.js) */}
      {/* ...pageProps: 아래의 getInitialProps 에서 받아온 props 객체, 자식 컴포넌트들에게 props로 전달 */}
      <Component {...pageProps} />
    </AppLayout>
  </Provider>
);

// 부모로부터 내려온 props를 검증
// 프로그래밍이 안정적이고 견고해짐
// 자체 props를 잘못 전달하는 에러를 표시해줌
ChoWitter.propTypes = {
  Component: PropTypes.elementType.isRequired, // elementType: 컴포넌트식의 props
  store: PropTypes.object.isRequired,
  pageProps: PropTypes.object.isRequired,
};

// getInitialProps:
// next가 추가해준 라이프사이클
// 제일 먼저 실행된다.
// 서버쪽의 데이터를 getInitialProps로 먼저 가져와서 프론트에 렌더링(SSR)
// 서버, 프론트 동시 실행
// next가 getInitialProps를 실행 시킬때 context를 같이 넣어준다
ChoWitter.getInitialProps = async (context) => {
  // next가 가지고 있는 ctx라는것이 getInitialProps 여기에 인자로 전달됨
  // ctx는 query 라는 객체를 가지고 있음 ex:) query: { tag: '테스트' }
  // 그러면 Component에서 props로 사용할수 있는데
  // 여기서 Component란 pages 폴더안에 있는 모든 파일들을 말한다
  // 단 해당 컴포넌트에서 props로 사용하려면
  // 해당컴포넌트이름.getInitialProps = async (context) => { context.query.tag }
  // 이렇게 가져와야 한다
  const { ctx, Component } = context;
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};

// react를 redux에 연결
// 아래 코드의 틀은 거의 항상 들어가니까 외우는 느낌으로
const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  // middleware는 액션과 스토어 사이에서 동작한다.
  // sagas/middleware.js 에 있는 sagaMiddleware를 리덕스와 연결
  const middlewares = [sagaMiddleware];
  // enhancer의 뜻: 향상시키다
  // compose: middleware들끼리 합성 시켜줌
  // 아래 compose안에 들어있는 모든것을 합성해서 store에 넣어줌
  const enhancer = process.env.NODE_ENV === 'prodution' // 개발 환경일떄만 REDUX_DEVTOOLS 사용, 배포시에 사용시 redux state들이 노출되서 보안 위협
    ? compose(applyMiddleware(...middlewares))
    : compose(
      // applyMiddleware: 위에 배열안에 들어간 미들웨어들을 적용
      applyMiddleware(...middlewares),
      // redux devtools 확장프로그램을 크롬에 설치하면 윈도우 객체에 window.__REDUX_DEVTOOLS_EXTENSION__() 함수가 생김
      !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    );
  const store = createStore(reducer, initialState, enhancer);
  // rootSaga를 sagaMiddleware와 연결
  sagaMiddleware.run(rootSaga);
  // store가 ChoWitter에 props로 들어감
  return store;
};

export default withRedux(configureStore)(ChoWitter);
