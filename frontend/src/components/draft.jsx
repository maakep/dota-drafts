import * as React from 'react';
import { Row } from '../lib/Layout';
import styled from 'styled-components';
import { getHeroInUrl } from '../lib/hero-lib';

export function Draft(props) {
  const [show, setShow] = React.useState(false);
  const { draft } = props;

  return (
    <DraftRow onClick={() => setShow(!show)}>
      <Row>
        <Item>{draft.title}</Item>
      </Row>
      <Heroes>
        <Lane>
          <Hero hero={draft.pos3}>3 {draft.pos3}</Hero>
          <Hero hero={draft.pos4}>4 {draft.pos4}</Hero>
        </Lane>
        <Lane>
          <Hero hero={draft.pos2}>2 {draft.pos2}</Hero>
        </Lane>
        <Lane>
          <Hero hero={draft.pos1}>1 {draft.pos1}</Hero>
          <Hero hero={draft.pos5}>5 {draft.pos5}</Hero>
        </Lane>
      </Heroes>
      {(show || props.alwaysVisible) && <Row>{draft.description}</Row>}
    </DraftRow>
  );
}

const DraftRow = styled.div`
  margin-top: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  background-color: #d7d7d7;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  clip-path: inset(-10px 0px -10px 0px);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    box-shadow: 0 4px 9px rgba(0, 0, 0, 0.25), 0 3px 6px rgba(0, 0, 0, 0.22);
  }
`;

const Item = styled.div``;

const Lane = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 32px;
`;

const Heroes = styled.div`
  display: flex;
  flex-direction: flex-row;
  flex-wrap: wrap;
`;

const Hero = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 16px;
  height: 63px;
  width: 112px;
  background-color: #c5c5c5;
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 40%,
      rgba(0, 0, 0, 0.8)
    ),
    url('https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${(
      p,
    ) => getHeroInUrl(p.hero)}.png');
  background-size: cover;
  color: white;
  padding: 4px;
  text-align: bottom;
  font-size: 13px;
`;
