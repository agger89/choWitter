import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import {
  Overlay, Header, CloseBtn, SlickWrapper, ImageWrapper, Indicator,
} from './style';

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
                <img src={v.src} />
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
