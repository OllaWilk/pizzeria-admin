import React from 'react';
import styles from './Tables.module.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';

import AddIcon from '@material-ui/icons/Add';

//import { ViewState }  from '@devexpress/dx-react-scheduler';
//import { Scheduler, DayView, Appointments, AppointmentTooltip, DateNavigator, TodayButton } from '@devexpress/dx-react-scheduler-material-ui';

const tables = [
  { startDate: '2020-01-28 15:00', endDate: '2020-01-28 16:00', title: 'John Smith, table 1' },
  { startDate: '2020-01-28 18:00', endDate: '2020-01-28 19:30', title: 'Andrea Sun, table 2' },
  { startDate: '2020-01-28 14:00', endDate: '2020-01-28 16:00', title: 'Lesley Nilson, table 3' },
  { startDate: '2020-01-28 15:00', endDate: '2020-01-28 17:30', title: 'Miranda Ball, table 2' },
  { startDate: '2020-01-28 19:00', endDate: '2020-01-28 20:30', title: 'Carl Fischer, table 1' },
];


const Tables = (id) => {
  return (
    <Container maxWidth='lg'>
      <Toolbar />
      <Paper className={styles.component}>
        <div className={styles.heading}>
          <h2>Bookings & events</h2>
          <Button component={Link} to={`${process.env.PUBLIC_URL}/tables/booking/${id}`}>Booking Details</Button>
          <Button component={Link} to={`${process.env.PUBLIC_URL}/tables/events/${id}`}>Event Details</Button>
          <Button color='secondary'  aria-label='add' component={Link} to={`${process.env.PUBLIC_URL}/tables/booking/new`}>
            <AddIcon /> Add New Booking
          </Button>
          <Button color='secondary'  aria-label='add' component={Link} to={`${process.env.PUBLIC_URL}/tables/booking/new`}>
            <AddIcon /> Add New Event
          </Button>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Hour/Table</TableCell>
                {tables.map(table => (
                  <TableCell key={table.id}>{table.id}</TableCell>
                ))}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            </TableBody>
          </Table>
        </div>
      </Paper>
    </Container>
  );
};

Tables.propTypes= {
  id: PropTypes.string,
};

export default Tables;