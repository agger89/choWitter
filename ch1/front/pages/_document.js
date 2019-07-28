// helmet SSR하는 페이지
// html을 담당하는 페이지

import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
// Document: next에서 기본적으로 제공하는 도큐먼트
// Main: app.js
// NextScript: next 서버구동에 필요한 스크립트들을 모아둔것
import Document, { Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static getInitialProps(context) {
    // Document가 App의 상위이기 떄문에 App을 랜더링 해줘야된다
    // 그래야 meta태그가 들어감
    const page = context.renderPage(App => props => <App {...props} />);
    // Helmet.renderStatic(): SSR적용
    return { ...page, helmet: Helmet.renderStatic() };
  }

  render() {
    // 위에 getInitialProps에서 받아온 helmet props
    // htmlAttributes: html의 속성들을 helmet에서 제공
    // bodyAttributes: body의 속성들을 helmet에서 제공
    const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
    // htmlAttributes가 객체 형식이기떄문에 컴포넌트 형식으로 변환
    const htmlAttrs = htmlAttributes.toComponent();
    // bodyAttributes 객체 형식이기떄문에 컴포넌트 형식으로 변환
    const bodyAttrs = bodyAttributes.toComponent();
    return (
      <html {...htmlAttrs}>
        <head>
          {/* helmet안에 들어있는 meta태그, script태그, link태그 등등을
             반복분을 통해서 넣어준다 */}
          {Object.values(helmet).map(el => el.toComponent())}
        </head>
        <body {...bodyAttrs}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

// props 타입 체크
MyDocument.proptypes = {
  helmet: PropTypes.object.isRequired,
};

export default MyDocument;
