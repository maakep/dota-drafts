import * as React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Spinner } from './components/spinner';
import { DraftList } from './components/draft-list';
import { Header } from './components/header';
import { CenterLayout } from './lib/Layout';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { SingleDraftPage } from './components/draft-page';

export function App() {
  const [drafts, setDrafts] = useState([]);

  useEffect(async () => {
    const res = await fetch('/api/drafts');
    const json = await res.json();
    const sleeper = await artificialLoadingTime(1000);

    const all = await Promise.all([json, res, sleeper]);
    setDrafts(all[0]);
  }, []);

  return (
    <BrowserRouter>
      <Body>
        <Header />
        <Content>
          <CenterLayout>
            {!drafts.length ? (
              <Spinner />
            ) : (
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
            )}
          </CenterLayout>
        </Content>
        <Footer />
      </Body>
    </BrowserRouter>
  );
}

function artificialLoadingTime(ms) {
  return new Promise((r) => setTimeout(r, ms));
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
