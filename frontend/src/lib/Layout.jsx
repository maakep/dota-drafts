import * as React from 'react';
import styled from 'styled-components';

export function Row({ children }) {
  return <RowDiv>{children}</RowDiv>;
}

export function Column({ children }) {
  return <ColumnDiv>{children}</ColumnDiv>;
}

export function CenterLayout({ children }) {
  return (
    <CenterLayoutWrapperDiv>
      <CenterLayoutDiv>{children}</CenterLayoutDiv>
    </CenterLayoutWrapperDiv>
  );
}

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const CenterLayoutWrapperDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const CenterLayoutDiv = styled.div`
  width: 1280px;
  background: #d9d9d9;
`;
