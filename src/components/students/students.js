import React, { useState } from 'react';
import {
  Button,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Layout } from '../layout/layout';
import { EntitlementRestricted } from '../entitlement-restricted/entitlement-restricted';
import { getStudents } from '../../services/students/students';

export function Students() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [students, setStudents] = useState([]);

  const requestStudents = async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const response = await getStudents();
      const { data } = response;
      setStudents(data);
    } catch (error) {
      setStudents([]);
      setHasError(true);
    }

    setIsLoading(false);
  };

  const showTable = Boolean(students.length);

  return (
    <EntitlementRestricted>
      <Layout
        hasError={hasError}
        isLoading={isLoading}
        subTitle="An example of fetching students."
        title="Students"
      >
        <Button variant="contained" onClick={requestStudents}>
          Request Students
        </Button>
        {showTable && (
          <TableContainer component={Paper} sx={{ my: 2 }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => {
                  const { id, firstName, lastName, email } = student;
                  return (
                    <TableRow key={id}>
                      <TableCell>{id}</TableCell>
                      <TableCell>{firstName}</TableCell>
                      <TableCell>{lastName}</TableCell>
                      <TableCell>
                        <Link href={`mailto:${email}`}>{email}</Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {!showTable && (
          <Typography sx={{ my: 2 }}>No students found.</Typography>
        )}
      </Layout>
    </EntitlementRestricted>
  );
}
