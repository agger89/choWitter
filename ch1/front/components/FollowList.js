import React, { memo } from 'react';
import {
  List, Card, Icon, Button,
} from 'antd';
import PropTypes from 'prop-types';

const FollowList = memo(({
  header, hasMore, data, onClickMore, onClickStop,
}) => (
  <List
    style={{ marginBottom: '20px' }}
    grid={{ gutter: 4, xs: 2, md: 3 }}
    size="small"
    header={<div>{header}</div>}
        // 더보기 유무
    loadMore={hasMore && <Button style={{ width: '100%' }} onClick={onClickMore}>더 보기</Button>}
    bordered
    dataSource={data}
    renderItem={item => (
      <List.Item style={{ marginTop: '20px' }}>
        {/* 배열안에 jsx 문법을 사용할때는 key를 꼭 적어야한다 */}
        <Card actions={[<Icon key="stop" type="stop" onClick={onClickStop(item.id)} title={header === '팔로잉 목록' ? '언팔로우' : '팔로워삭제'} />]}>
          <Card.Meta description={item.nickname} />
        </Card>
      </List.Item>
    )}
  />
));

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  hasMore: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  onClickMore: PropTypes.func.isRequired,
  onClickStop: PropTypes.func.isRequired,
};

export default FollowList;
