import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const PostCardContent = ({ postData }) => (
  <div>
    {/* 등록된 글을 배열로 쪼갬 */}
    {postData.split(/(#[^\s]+)/g).map((v) => {
      /* 등록된 글이 해시태그면 링크 태그로 변환 */
      if (v.match(/#[^\s]*/)) {
        return (
          <Link
            href={{ pathname: '/hashtag', query: { tag: v.slice(1) } }}
            as={`/hashtag/${v.slice(1)}`}
            key={v}
          >
            <a>{v}</a>
          </Link>
        );
      }
      /* 일반 문자면 그냥 리턴 */
      return v;
    })}
  </div>
);

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
