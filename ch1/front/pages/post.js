// 각 게시글에 대해 검색엔진 적용하는 페이지

import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { backUrl } from '../config/config';
import { LOAD_POST_REQUEST } from '../reducers/post';

const Post = ({ id }) => {
  const { singlePost } = useSelector(state => state.post);
  return (
    <>
      {/* head 태그에 들어감,
          검색엔진 로봇이 meta 태그의 정보를 긁어감
          검색엔진:
          ex:)카카오톡으로 친구에게 해당 사이트 url을 보내줬을떄
          나오는 사이트의 정보들이 보여지도록(image, content, title) */}
      <Helmet
        title={`${singlePost.User.nickname}님의 글`}
        description={singlePost.content}
        meta={[{
          name: 'description', content: singlePost.content,
        }, {
          property: 'og:title', content: `${singlePost.User.nickname}님의 게시글`,
        }, {
          property: 'og:description', content: singlePost.content,
        }, {
          property: 'og:image', content: singlePost.Images[0] && `http://api.starcho.com/${singlePost.Images[0].src}`,
        }, {
          property: 'og:url', content: `http://starcho.com/post/${id}`,
        }]}
      />
      <div>{singlePost.content}</div>
      <div>{singlePost.User.nickname}</div>
      <div>
        {singlePost.Images[0] && <img src={`${backUrl}/${singlePost.Images[0].src}`} />}
      </div>
    </>
  );
};

Post.getInitialProps = async (context) => {
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    data: context.query.id,
  });
  return { id: parseInt(context.query.id, 10) };
};

Post.prototype = {
  id: PropTypes.number.isRequired,
};

export default Post;
