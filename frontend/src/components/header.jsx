import * as React from 'react';
import styled from 'styled-components';
import { CenterLayout } from '../lib/Layout';

export function Header() {
  return (
    <Wrapper>
      <CenterLayout>
        <Logo />
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
