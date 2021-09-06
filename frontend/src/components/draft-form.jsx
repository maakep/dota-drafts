import * as React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Row } from '../lib/Layout';

export function DraftForm() {
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  async function onSubmit(d) {
    const res = await fetch('/api/draft', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(d),
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
          <input {...register('description')} autoComplete='off' />
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
