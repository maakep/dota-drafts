import * as React from 'react';
import { useForm } from 'react-hook-form';

export function DraftForm() {
  const { register, handleSubmit } = useForm();

  function onSubmit(d) {
    console.log(d);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Test</label>
      <input {...register('test')} autoComplete='off' />
    </form>
  );
}
