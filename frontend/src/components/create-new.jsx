import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export function CreateNew() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Button onClick={() => navigate('/new/draft')}>DRAFT</Button>
      <Button onClick={() => navigate('/new/combo')}>HERO COMBOS</Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 32px;
`;

const Button = styled.div`
  width: 100px;
  height: 100px;
  border: solid 1px black;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
`;
