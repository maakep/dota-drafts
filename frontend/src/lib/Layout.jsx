import React from 'react';
import styled from 'styled-components';

export function CenterLayout({ children }) {
  return (
    <CenterLayoutWrapperDiv>
      <CenterLayoutDiv>{children}</CenterLayoutDiv>
    </CenterLayoutWrapperDiv>
  );
}

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const CenterLayoutWrapperDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const CenterLayoutDiv = styled.div`
  max-width: 1280px;
  width: 100%;
  background: #d9d9d9;
`;
