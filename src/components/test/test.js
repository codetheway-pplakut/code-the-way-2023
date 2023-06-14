import * as React from 'react';
import { Layout } from '../layout/layout';
import { Table1 } from './table';
import { Tab1 } from './tab';

export function Test() {
  // const navigate = useNavigate();

  return (
    <Layout title="STUDENTS" errorTitle="Whoops!">
      <Tab1 />
      <Table1 />
    </Layout>
  );
}
