import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import ImagesZoom from './ImagesZoom';

const PostImages = ({ images }) => {
  // ImagesZoom 컴포넌트 보여줄지 말지
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  // 이미지 한개일때
  if (images.length === 1) {
    return (
      <>
        <img src={images[0].src.replace(/original\//, 'thumb/')} onClick={onZoom} style={{ cursor: 'pointer' }} title="원본 이미지 보기" />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  // 이미지 두개일때
  if (images.length === 2) {
    return (
      <>
        <div style={{ cursor: 'pointer' }} title="원본 이미지 보기">
          {/* replace(/original\//, 'thumb/'): lambda로 리사이징된 이미지로 변경*/}
          <img src={images[0].src.replace(/original\//, 'thumb/')} width="50%" onClick={onZoom} />
          <img src={images[0].src.replace(/original\//, 'thumb/')} width="50%" onClick={onZoom} />
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  // 이미지 두개이상 일때
  return (
    <>
      <div>
        <img src={images[0].src.replace(/original\//, 'thumb/')} width="50%" onClick={onZoom} style={{ cursor: 'pointer' }} title="원본 이미지 보기" />
        <div
          style={{
            display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle ', cursor: 'pointer',
          }}
          onClick={onZoom}
        >
          <Icon type="plus" />
          <br />
          {images.length - 1}
          개의 사진 더보기
        </div>
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
  })).isRequired,
};

export default PostImages;
