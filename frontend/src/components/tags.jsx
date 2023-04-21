import React from 'react';
import { useState } from 'react';
import { FieldRow, Label, HeaderInput } from './draft-form';
import { colors, randomColor } from '../lib/colors';
import styled from 'styled-components';

export function Tags({ formMethods }) {
  const [tags, setTags] = useState([]);

  return (
    <>
      <FieldRow>
        <Label>Tags</Label>
        <HeaderInput
          {...formMethods.register('tags')}
          onChange={(e) => {
            setTags(e.currentTarget.value.split(',').map((x) => x.trim()));
          }}
          placeholder={'comma separated'}
          autoComplete='off'
        />
      </FieldRow>
      <DisplayTags tags={[...draft.tags, draft.version]} />
    </>
  );
}

export function DisplayTags({ tags, randomizeColor }) {
  if (!Array.isArray(tags)) tags = tags.split(',').map((x) => x.trim());

  return (
    <TagWrapper>
      {[...new Set(tags)].map((x, i) => (
        <Tag key={x} color={randomizeColor ? randomColor() : colors[i]}>
          {x}
        </Tag>
      ))}
    </TagWrapper>
  );
}

const TagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 12px;
`;

const Tag = styled.div`
  padding: 8px;
  margin: 8px;
  background: ${(p) => p.color || '#e8dff5'};
`;
