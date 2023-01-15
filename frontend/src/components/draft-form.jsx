import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Row } from '../lib/Layout';

export function DraftForm() {
  const { register, handleSubmit } = useForm();

  async function onSubmit(d) {
    const body = {
      title: d.title,
      description: d.description,
      pos1: d.pos1,
      pos2: d.pos2,
      pos3: d.pos3,
      pos4: d.pos4,
      pos5: d.pos5,
      tags: d.tags.split(',').map((x) => x.trim()),
    };
    const res = await fetch('/api/draft', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (res.status == 200) {
      const json = await res.json();
      window.location.href = '/draft/' + json.id;
    }
  }

  return (
    <Wrapper>
      <h1>Create new draft</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldRow>
          <Label>Title</Label>
          <input {...register('title')} autoComplete='off' />
        </FieldRow>
        <FieldRow>
          <Label>Description</Label>
          <textarea {...register('description')} autoComplete='off' />
        </FieldRow>
        <FieldRow>
          <Label>Pos1</Label>
          <input {...register('pos1')} autoComplete='off' />
        </FieldRow>
        <FieldRow>
          <Label>Pos2</Label>
          <input {...register('pos2')} autoComplete='off' />
        </FieldRow>
        <FieldRow>
          <Label>Pos3</Label>
          <input {...register('pos3')} autoComplete='off' />
        </FieldRow>
        <FieldRow>
          <Label>Pos4</Label>
          <input {...register('pos4')} autoComplete='off' />
        </FieldRow>
        <FieldRow>
          <Label>Pos5</Label>
          <input {...register('pos5')} autoComplete='off' />
        </FieldRow>
        <FieldRow>
          <Label>Tags</Label>
          <input {...register('tags')} autoComplete='off' />
        </FieldRow>
        <FieldRow>
          <button type='submit'>Go</button>
        </FieldRow>
      </form>
    </Wrapper>
  );
}

const FieldRow = styled(Row)`
  padding: 8px 0;
`;

const Wrapper = styled.div`
  padding: 32px;
`;

const Label = styled.label`
  padding: 0px 8px;
`;
