import * as React from 'react';
import styled from 'styled-components';
import { DraftList } from './components/draft-list';
import { Header } from './components/header';
import { CenterLayout } from './lib/Layout';
import { Route, Switch } from 'react-router-dom';
import { SingleDraftPage } from './components/draft-page';

export function App(props) {
  const { drafts } = props;

  return (
    <Body>
      <Header />
      <Content>
        <CenterLayout>
          <Switch>
            <Route path='/draft/new'>
              <div>draft page ayy</div>
            </Route>
            <Route path='/draft/:draftId'>
              <SingleDraftPage drafts={drafts} />
            </Route>
            <Route path='/'>
              <DraftList drafts={drafts} />
            </Route>
          </Switch>
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
