import React from 'react';
import { useState } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import styled from 'styled-components';
import { Row } from '../lib/Layout';
import Select from 'react-select';
import { ALL_HERO_OPTIONS } from '../lib/hero-lib';
import { Tags } from './tags';

export function DraftForm({ isCombo }) {
  const formMethods = useForm();
  const [comboNum, setComboNum] = useState(2);

  async function onSubmit(d) {
    const body = isCombo
      ? {
          title: d.title,
          description: d.description,
          heroes: [d.hero1, d.hero2, d.hero3, d.hero4].filter((x) => x != null),
          tags: d.tags.split(',').map((x) => x.trim()),
        }
      : {
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

  function HeroInput({ label }) {
    return (
      <FieldRow>
        {<Label>{!isCombo && label}</Label>}
        <Controller
          name={label}
          render={({ field }) => (
            <WideSelect
              key={label}
              options={ALL_HERO_OPTIONS}
              onChange={(val) => field.onChange(val.value)}
            />
          )}
        />
      </FieldRow>
    );
  }

  function NormalInput({ label }) {
    return (
      <FieldRow>
        <Label>{label}</Label>
        <HeaderInput
          {...formMethods.register(label.toLowerCase())}
          autoComplete='off'
        />
      </FieldRow>
    );
  }

  return (
    <Wrapper>
      <h1>Create new draft</h1>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <NormalInput label={'Title'} />
          <NormalInput label={'Description'} />
          {isCombo ? (
            <>
              {new Array(comboNum).fill(undefined).map((_, i) => (
                <HeroInput key={`hero${i}`} label={`hero${i}`} />
              ))}
              <FieldRow>
                <Label />
                {comboNum < 4 && (
                  <MoreHeroes onClick={() => setComboNum(comboNum + 1)}>
                    +
                  </MoreHeroes>
                )}
              </FieldRow>
            </>
          ) : (
            <>
              <HeroInput label={'pos1'} />
              <HeroInput label={'pos2'} />
              <HeroInput label={'pos3'} />
              <HeroInput label={'pos4'} />
              <HeroInput label={'pos5'} />
            </>
          )}
          <Tags formMethods={formMethods} />
          <FieldRow>
            <button type='submit'>Submit draft</button>
          </FieldRow>
        </form>
      </FormProvider>
    </Wrapper>
  );
}

export const FieldRow = styled(Row)`
  padding: 8px 0;
`;

const Wrapper = styled.div`
  padding: 32px;
`;

export const Label = styled.label`
  padding: 0px 8px;
  width: 100px;
  display: flex;
  align-items: center;
`;

const WideSelect = styled(Select)`
  width: 200px;
`;

export const HeaderInput = styled.input`
  background: #f2f2f2;
  border: none;
  padding: 8px;
  width: 184px;

  &:focus {
    outline: none;
    box-shadow: black -1px 1px 3px;
  }
`;

const MoreHeroes = styled.div`
  height: 34px;
  width: 34px;
  border-radius: 4px;
  border: solid 1px black;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: #f2f2f2;
`;
