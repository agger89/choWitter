import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import Slick from 'react-slick';

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div style={{
      position: 'fixed', zIndex: 5000, top: 0, left: 0, right: 0, bottom: 0,
    }}
    >
      <header style={{
        height: 44, background: 'white', position: 'relative', padding: 0, textAlign: 'center',
      }}
      >
        <h1 style={{
          margin: 0, fontSize: '17px', color: '#333', lineHeight: '44px',
        }}
        >
          상세 이미지
        </h1>
        <Icon
          type="close"
          onClick={onClose}
          style={{
            position: 'absolute', right: 0, top: 0, padding: 15, lineHeight: '14px', cursor: 'pointer',
          }}
        />
      </header>
      <div style={{ height: 'calc(100% - 44px)', background: '#090909' }}>
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
              <div style={{ padding: 32, textAlign: 'center' }}>
                <img src={`http://localhost:3065/${v.src}`} style={{ margin: '0 auto', maxHeight: 750 }} />
              </div>
            ))}
          </Slick>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: 75, height: 30, lineHeight: '30px', borderRadius: 15, background: '#313131', display: 'inline-block', textAlign: 'center', color: 'white', fontSize: '15px',
            }}
            >
              {/* 현재 슬라이드 인덱스 번호 / 현재 슬라이드 갯수 */}
              {currentSlide + 1}
              {' '}
              /
              {' '}
              {images.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
  })).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
