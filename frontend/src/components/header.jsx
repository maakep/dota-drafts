import * as React from 'react';
import styled from 'styled-components';
import { CenterLayout, Row } from '../lib/Layout';

export function Header() {
  return (
    <Wrapper>
      <CenterLayout>
        <Row>
          <Logo />
          <AddDraft onClick={() => alert('soon')}>+</AddDraft>
        </Row>
      </CenterLayout>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 70px;
  background-color: #d6d6d6;
  align-items: center;
`;

const Logo = styled.div`
  height: 70px;
  width: 120px;
  background-color: #d1d1d1;
`;

const AddDraft = styled.div`
  height: 70px;
  width: 70px;
  line-height: 70px;
  font-size: 30px;
  text-align: center;
  cursor: pointer;
  color: #005500;
  margin-left: auto;

  &:hover {
    color: #008800;
  }

  &:active {
    color: #003300;
  }
`;
