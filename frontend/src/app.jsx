import React from 'react';
import styled from 'styled-components';
import { DraftList } from './components/draft-list';
import { Header } from './components/header';
import { CenterLayout } from './lib/Layout';
import { Route, Routes } from 'react-router-dom';
import { SingleDraftPage } from './components/draft-page';
import { DraftForm } from './components/draft-form';
import { CreateNew } from './components/create-new';
import { DraftEditWrapper } from './components/draft-edit';

export function App(props) {
  const { drafts } = props;

  return (
    <Body>
      <Header />
      <Content>
        <CenterLayout>
          <Routes>
            <Route path='/new' element={<CreateNew />} />
            <Route path='/new/draft' element={<DraftForm />} />
            <Route path='/new/combo' element={<DraftForm isCombo />} />
            <Route
              path='/draft/:draftId/edit'
              element={<DraftEditWrapper drafts={drafts} />}
            />
            <Route
              path='/draft/:draftId'
              element={<SingleDraftPage drafts={drafts} />}
            />
            <Route path='/' element={<DraftList drafts={drafts} />} />
          </Routes>
        </CenterLayout>
      </Content>
      <Footer />
    </Body>
  );
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  background-color: #e9e9e9;
  flex-grow: 1;
`;

const Footer = styled.div`
  height: 120px;
  background-color: #d6d6d6;
`;
