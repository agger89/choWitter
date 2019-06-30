import React from 'react';
import { List, Card, Icon } from 'antd';
import NicknameEditForm from '../components/NicknameEditForm';

const Profile = () => (
  <div>
    <NicknameEditForm />
    <List
      style={{ marginBottom: '20px' }}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>팔로워 목록</div>}
      bordered
      dataSource={['조니', '리버풀', '조위터오피셜']}
      renderItem={item => (
        <List.Item style={{ marginTop: '20px' }}>
          {/* 배열안에 jsx 문법을 사용할때는 key를 꼭 적어야한다 */}
          <Card actions={[<Icon key="stop" type="stop" />]}>
            <Card.Meta description={item} />
          </Card>
        </List.Item>
      )}
    />
    <List
      style={{ marginBottom: '20px' }}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>팔로워 목록</div>}
      bordered
      dataSource={['조니', '리버풀', '조위터오피셜']}
      renderItem={item => (
        <List.Item style={{ marginTop: '20px' }}>
          {/* 배열안에 jsx 문법을 사용할때는 key를 꼭 적어야한다 */}
          <Card actions={[<Icon key="stop" type="stop" />]}>
            <Card.Meta description={item} />
          </Card>
        </List.Item>
      )}
    />
  </div>
);

export default Profile;
