import React from 'react';
import { DraftForm } from './draft-form';
import { useParams } from 'react-router-dom';

export function DraftEditWrapper(props) {
  const { draftId } = useParams();
  const { drafts } = props;
  const draft = drafts.find((x) => x._id == draftId || x.title == draftId);

  return <DraftForm draft={draft} isCombo={draft.heroes != undefined} />;
}
