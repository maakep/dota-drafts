import * as React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { CenterLayout, Row } from '../lib/Layout';

export function Header() {
  const history = useHistory();

  return (
    <Wrapper>
      <CenterLayout>
        <Row>
          <Logo onClick={() => history.push('/')} />
          <AddDraft onClick={() => history.push('/draft/new')}>+</AddDraft>
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
  cursor: pointer;
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
