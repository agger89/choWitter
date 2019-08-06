import { Input } from 'antd';
import styled from 'styled-components';

export const InputSearch = styled(Input.Search)`
  input::-webkit-input-placeholder { font-size: 12px; }
  input::-moz-placeholder { font-size: 12px; }
  input:-ms-input-placeholder { font-size: 12px; }
  input:-moz-placeholder { font-size: 12px; }
  input::placeholder { font-size: 12px; }
  @media only screen and (max-width: 768px) {
    width: 190px;
  }
`;

export const LinkWrap = styled.div`
  padding: 10px;
`;
