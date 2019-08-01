// _app.js의 특징은 아래에 있는 index.js, profile.js, signup.js가 부모컴포넌트로 사용
// _app.js 안에다가 공통적인 부분을 모은다.
import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
// 리액트를 리덕스와 연결
import withRedux from 'next-redux-wrapper';
// SSR을 하기위해
import withReduxSaga from 'next-redux-saga';
import axios from 'axios';
import Helmet from 'react-helmet';
import { Container } from 'next/app';
// Provider: 리덕스 state를 컴포넌트들에게 제공해준다.
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import AppLayout from '../components/AppLayout';
import reducer from '../reducers';
import rootSaga from '../sagas';
import { LOAD_USER_REQUEST } from '../reducers/user';

const ChoWitter = ({ Component, store, pageProps }) => (
  // Helmet SSR 적용시 추가
  <Container>
    {/* Provider가 부모 컴포넌트이고 store를 가지고 있기 때문에
      자식 컴포넌트들은 store에 있는 state를 받을수 있다
      store: state, action, reducer가 합쳐진것 */}
    <Provider store={store}>
      {/* head 태그에 들어갈 것들 */}
      <Helmet
        title="ChoWitter"
        htmlAttributes={{ lang: 'ko' }}
        meta={[{
          charset: 'UTF-8',
        }, {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
        }, {
          'http-equiv': 'X-UA-Compatible', content: 'IE=edge',
        }, {
          name: 'description', content: 'ChoWitter',
        }, {
          name: 'og:title', content: 'ChoWitter',
        }, {
          name: 'og:description', content: 'ChoWitter SNS',
        }, {
          property: 'og:type', content: 'website',
        }, {
          property: 'og:image', content: 'http://localhost:3000/favicon.ico',
        }]}
        link={[{
          rel: 'shortcut icon', href: '/favicon.ico',
        }, {
          rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css',
        }, {
          rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css',
        }, {
          rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css',
        }]}
      />
      {/* 위에 helmet 으로 대체되서 주석 */}
      {/* <Head>
        <title>choWitter</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.19.0/antd.css" />
        <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
      </Head> */}
      {/* <AppLayout> */}
        {/* next에서 _app.js는 props로 컴포넌트(<Component />)를 받는다(index.js, profile.js, signup.js) */}
        {/* ...pageProps: 아래의 getInitialProps 에서 받아온 props 객체, 자식 컴포넌트들에게 props로 전달 */}
        <Component {...pageProps} />
      {/* </AppLayout> */}
    </Provider>
  </Container>
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
// pages 폴더 안에 page들에게만 사용한다
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
  // context.store에서 state들을 불러옴
  const state = ctx.store.getState();
  // 클라이언트 환경에서는 브라우저가 쿠키를 넣어주지만
  // 서버일때는 직접 넣어야된다.
  // 서버일떄만 쿠키를 가져온다
  const cookie = ctx.isServer ? ctx.req.headers.cookie : '';
  // 서버일떄만 && 쿠키가 있을떄만 실행
  if (ctx.isServer && cookie) {
    // axios.defaults: 각기 다른 모든 axios 요청에 cookie가 적용된다
    axios.defaults.headers.Cookie = cookie;
    // 토큰도 보내줄수 있음
    // axios.defaults.headers.Authorization = token;
  }
  // 페이지가 첫 로드 될떄 내정보가 없으면 유저 정보를 불러온다
  // 로그인 쿠키가 남아있는 전제조건하에
  if (!state.user.me) {
    // SSR을 하기위해서 context.store에서 dispatch 해준다
    // 새로고침시 잠깐 빈페이지 나오는거 방지
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST,
    });
  }
  let pageProps = {};
  if (Component.getInitialProps) {
    // Failed prop type: The prop `pageProps` is marked as required in `ChoWitter`, but its value is `undefined`
    // pageProps는 isRequired로 propTypes을 체크 했기때문에
    // 항상 값이 있어야 한다
    // 그래서 코드 추가 후 에러 해결: Component.getInitialProps(ctx) || {}
    pageProps = await Component.getInitialProps(ctx) || {};
  }
  return { pageProps };
};

// react를 redux에 연결
// 아래 코드의 틀은 거의 항상 들어가니까 외우는 느낌으로
const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  // middleware는 액션과 스토어 사이에서 동작한다.
  // sagas/middleware.js 에 있는 sagaMiddleware를 리덕스와 연결
  const middlewares = [sagaMiddleware, (store) => (next) => (action) => {
    // 리덕스 사가 에러 찾는 방식 (커스텀 미들웨어)
    // console.log(action);
    next(action);
  }];
  // enhancer의 뜻: 향상시키다
  // compose: middleware들끼리 합성 시켜줌
  // 아래 compose안에 들어있는 모든것을 합성해서 store에 넣어줌
  const enhancer = process.env.NODE_ENV === 'prodution' // 개발 환경일떄만 REDUX_DEVTOOLS 사용, 배포시에 사용시 redux state들이 노출되서 보안 위협
    ? compose(applyMiddleware(...middlewares))
    : compose(
      // applyMiddleware: 위에 배열안에 들어간 미들웨어들을 적용
      applyMiddleware(...middlewares),
      // redux devtools 확장프로그램을 크롬에 설치하면 윈도우 객체에 window.__REDUX_DEVTOOLS_EXTENSION__() 함수가 생김
      !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    );
  const store = createStore(reducer, initialState, enhancer);
  // store.sagaTask: SSR을 하기위함
  // rootSaga를 sagaMiddleware와 연결
  store.sagaTask = sagaMiddleware.run(rootSaga);
  // store가 ChoWitter에 props로 들어감
  return store;
};

// SSR을 하기위해 withReduxSaga로 ChoWitter를 감싸준다
export default withRedux(configureStore)(withReduxSaga(ChoWitter));
