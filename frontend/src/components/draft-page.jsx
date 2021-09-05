import * as React from 'react';
import { Draft } from './draft';
import { useParams } from 'react-router-dom';

export function SingleDraftPage(props) {
  const { draftId } = useParams();
  const { drafts } = props;

  return (
    <Draft
      draft={drafts.find((x) => x._id == draftId || x.title == draftId)}
      alwaysVisible
    />
  );
}
