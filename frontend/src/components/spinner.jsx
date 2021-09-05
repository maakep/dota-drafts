import * as React from 'react';
import styled from 'styled-components';
import SpinnerAnimation from 'react-spinners/GridLoader';
import { Draft } from './draft';
import { Column } from '../lib/Layout';

export function Spinner() {
  return (
    <Column>
      <Draft />
    </Column>
  );
}
