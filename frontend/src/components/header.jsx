import React from 'react';
import styled from 'styled-components';
import { UnadornedLink } from '../lib/components';
import { CenterLayout, RowBetween } from '../lib/Layout';

export function Header() {
  return (
    <Wrapper>
      <CenterLayout>
        <RowBetween>
          <UnadornedLink to={'/'}>
            <Logo />
          </UnadornedLink>
          <UnadornedLink to={'/new'}>
            <AddDraft>create</AddDraft>
          </UnadornedLink>
        </RowBetween>
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
  padding: 0 8px;
  line-height: 70px;
  font-size: 15px;
  text-align: center;
  cursor: pointer;
  color: #005500;

  &:hover {
    color: #008800;
  }

  &:active {
    color: #003300;
  }
`;
