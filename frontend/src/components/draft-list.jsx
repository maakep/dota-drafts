import * as React from 'react';
import { Column, Row } from '../lib/Layout';
import styled from 'styled-components';
import { Draft } from './draft';

export function DraftList(props) {
  return (
    <Column>
      {props.drafts.map((d) => (
        <Draft draft={d} key={d._id} />
      ))}
    </Column>
  );
}
