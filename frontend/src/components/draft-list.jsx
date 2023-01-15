import React from 'react';
import { Column } from '../lib/Layout';
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
