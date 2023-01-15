import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Row } from '../lib/Layout';

export function ComboForm() {
  const { register, handleSubmit } = useForm();

  async function onSubmit(d) {
    const body = {
      title: d.title,
      description: d.description,
      heroes: [d.hero1, d.hero2, d.hero3, d.hero4].filter((x) => x != ''),
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
          <h3>Heroes</h3>
        </FieldRow>
        <FieldRow>
          <input {...register('hero1')} autoComplete='off' />
        </FieldRow>
        <FieldRow>
          <input {...register('hero2')} autoComplete='off' />
        </FieldRow>
        <FieldRow>
          <input {...register('hero3')} autoComplete='off' />
        </FieldRow>
        <FieldRow>
          <input {...register('hero4')} autoComplete='off' />
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
