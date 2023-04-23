import React from 'react';
import { useState, useId } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import styled from 'styled-components';
import { Row } from '../lib/Layout';
import Select from 'react-select';
import { ALL_HERO_OPTIONS } from '../lib/hero-lib';
import { Tags } from './tags';

export function DraftForm({ isCombo, draft }) {
  const formMethods = useForm({
    defaultValues: {
      title: draft?.title,
      description: draft?.description,
      pos1: draft?.pos1,
      pos2: draft?.pos2,
      pos3: draft?.pos3,
      pos4: draft?.pos4,
      pos5: draft?.pos5,
      hero1: draft?.heroes?.[0],
      hero2: draft?.heroes?.[1],
      hero3: draft?.heroes?.[2],
      hero4: draft?.heroes?.[3],
      hero5: draft?.heroes?.[4],
      tags: draft?.tags.join(', '),
    },
  });
  const [comboNum, setComboNum] = useState(draft?.heroes?.length || 2);

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

    if (draft != undefined) {
      body.draftId = draft._id;
    }

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
              instanceId={useId()}
            />
          )}
        />
      </FieldRow>
    );
  }

  function NormalInput({ label, textarea }) {
    return (
      <FieldRow>
        <Label>{label}</Label>
        {textarea ? (
          <Textarea
            {...formMethods.register(label.toLowerCase())}
            autoComplete='off'
          />
        ) : (
          <HeaderInput
            {...formMethods.register(label.toLowerCase())}
            autoComplete='off'
          />
        )}
      </FieldRow>
    );
  }

  return (
    <Wrapper>
      <h1>Create new {isCombo ? 'combo' : 'draft'}</h1>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <NormalInput label={'Title'} />
          <NormalInput label={'Description'} textarea />
          {isCombo ? (
            <>
              {new Array(comboNum).fill(undefined).map((_, i) => (
                <HeroInput key={`hero${i}`} label={`hero${i + 1}`} />
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

const Textarea = styled.textarea`
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
