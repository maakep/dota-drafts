import * as React from 'react';
import styled from 'styled-components';
import SpinnerAnimation from 'react-spinners/GridLoader';

// TODO: Replace with skeleton entities
export function Spinner() {
  return (
    <Wrapper>
      <SpinnerAnimation size={30} margin={2} color='#000000' loading={true} />
      <SpinnerAnimation size={30} margin={2} color='#000000' loading={true} />
      <SpinnerAnimation size={30} margin={2} color='#000000' loading={true} />
      <SpinnerAnimation size={30} margin={2} color='#000000' loading={true} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
