import * as React from 'react';
import { Column, Row } from '../lib/Layout';
import { DraftForm } from './draft-form';
import styled from 'styled-components';

export function DraftList(props) {
  return (
    <Column>
      {props.drafts.map((d) => (
        <DraftRow key={d._id}>
          <Item>
            {d.title}, {d.description}
          </Item>
          <Item>3: {d.pos3}</Item>
          <Item>4: {d.pos4}</Item>
          <Item>2: {d.pos2}</Item>
          <Item>1: {d.pos1}</Item>
          <Item>5: {d.pos5}</Item>
        </DraftRow>
      ))}
    </Column>
  );
}

const DraftRow = Row;

const Item = styled.div`
  padding: 16px;
`;
