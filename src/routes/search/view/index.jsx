import React from 'react';

import Page from '../../page';
import { Header } from './components';

export const View = props => (
  <Page>
    <Header />
    {props.countries.map((country, i) => <li key={i}>{country}</li>)}
  </Page>
);

export default View;
