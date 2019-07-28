import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import Slick from 'react-slick';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  z-index: 5000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Header = styled.header`
  height: 44px;
  background: white;
  position: relative;
  padding: 0;
  text-align: center;

  & h1 {
    margin: 0;
    font-size: 17px;
    color: #333;
    line-height: 44px;
  }
`;

const SlickWrapper = styled.div`
  height: calc(100% - 44px);
  background: #090909;
`;

const CloseBtn = styled(Icon)`
  position: absolute;
  right: 0;
  top: 0;
  padding: 15px;
  line-height: 14px;
  cursor: pointer;
`;

const Indicator = styled.div`
  text-align: center;
  
  & > div {
    width: 75px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    backgroud: #313131;
    display: inline-block;
    text-align: center;
    color: white;
    font-size: 15px;
  }
`;

const ImageWrapper = styled.div`
  padding: 32px;
  text-align: center;

  $ > img {
    maring: 0 auto;
    max-height: 750px;
  }
`;

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Overlay>
      <Header>
        <h1>
          상세 이미지
        </h1>
        <CloseBtn
          type="close"
          onClick={onClose}
        />
      </Header>
      <SlickWrapper>
        <div>
          <Slick
            // 처음 몇번째 인덱스의 이미지 보여줄지
            initialSlide={0}
            // 슬라이드할때마다 현재 인덱스로 변경
            afterChange={slide => setCurrentSlide(slide)}
            // 무한 스크롤 없게
            infinite={false}
            // 화살표
            arrows
            // 한번에 한장만 보여주기
            slidesToShow={1}
            // 한번에 한장만 스크롤하기
            slidesToScroll={1}
          >
            {images.map(v => (
              <ImageWrapper>
                <img src={`http://localhost:3065/${v.src}`} />
              </ImageWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {/* 현재 슬라이드 인덱스 번호 / 현재 슬라이드 갯수 */}
              {currentSlide + 1}
              {' '}
              /
              {' '}
              {images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
  })).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
