import React from 'react';

import Page from '../../page';
import { Header } from './components';

export const View = props => (
  <Page>
    <Header />
    {props.statuses.map((status, i) => <li key={i}>{status.text}</li>)}
  </Page>
);

export default View;
