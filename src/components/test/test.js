import * as React from 'react';
import { Layout } from '../layout/layout';
// import { Tab1 } from './tab';
import { DynamicTable } from './newtable';

export function Test() {
  // const navigate = useNavigate();

  return (
    <Layout title="STUDENTS" errorTitle="Whoops!">
      <DynamicTable />
    </Layout>
  );
}
