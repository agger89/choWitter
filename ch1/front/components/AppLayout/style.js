import { Input } from 'antd';
import styled from 'styled-components';

export const InputSearch = styled(Input.Search)`
  @media only screen and (max-width: 768px) {
    width: 190px;
  }
`;

export const LinkWrap = styled.div`
  padding: 10px;
`;
