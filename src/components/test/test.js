import * as React from 'react';
import { Table2 } from './newtable';
import { Table1 } from './table1';
import { Layout } from '../layout/layout';
import { Tab1 } from './tab';

export function Test() {
  // const navigate = useNavigate();

  return (
    <Layout title="STUDENTS" errorTitle="Whoops!">
      <Table1 />
    </Layout>
  );
}
