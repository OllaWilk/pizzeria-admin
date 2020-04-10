import React from 'react';
import styles from './Tables.module.scss';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';

import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  //Appointments,
  // AppointmentTooltip,
  //DateNavigator,
  //TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

import Toolbar from '@material-ui/core/Toolbar';



const demoContent = [
  {hour: '12:00', table: 1, tableStatus:'booked'},
  {hour: '12:30', table: null, tableStatus: null},
  {hour: '13:00', tableStatus: null},
  {hour: '13:30', tableStatus: 'event'},
];

const tables = [
  {id: 1},
  {id: 2},
  {id: 3},
  {id: 4},
];

const data = [
  { startDate: '2020-01-28 15:00', endDate: '2020-01-28 16:00', title: 'John Smith, table 1' },
  { startDate: '2020-01-28 18:00', endDate: '2020-01-28 19:30', title: 'Andrea Sun, table 2' },
  { startDate: '2020-01-28 14:00', endDate: '2020-01-28 16:00', title: 'Lesley Nilson, table 3' },
  { startDate: '2020-01-28 15:00', endDate: '2020-01-28 17:30', title: 'Miranda Ball, table 2' },
  { startDate: '2020-01-28 19:00', endDate: '2020-01-28 20:30', title: 'Carl Fischer, table 1' },
];

const renderActions = status => {
  switch (status) {
    case 'free':
      return (
        <>
          <Button>booked</Button>
          <Button>free</Button>
        </>
      );
    case 'paid':
      return (
        <Button>free</Button>
      );
    default:
      return null;
  }
};

const Tables = (id) => {
  return (
    <Container maxWidth='lg'>
      <Toolbar />
      <Paper className={styles.component}>
        <div  className={styles.heading}>
          <h2 >Bookings & events </h2>
          <Button component={Link} to={`${process.env.PUBLIC_URL}/tables/booking/${id}`}>Booking Details</Button>
          <Button component={Link} to={`${process.env.PUBLIC_URL}/tables/events/${id}`}>Event Details</Button>
          <Button color='secondary'  aria-label='add' component={Link} to={`${process.env.PUBLIC_URL}/tables/booking/new`}>
            <AddIcon /> Add New Booking
          </Button>
          <Button color='secondary'  aria-label='add' component={Link} to={`${process.env.PUBLIC_URL}/tables/booking/new`}>
            <AddIcon /> Add New Event
          </Button>
        </div>
        <Divider/>
        <div  className={styles.heading}>




          <Scheduler
            data={data}
          >
            <ViewState
              defaultCurrentDate={new Date()}/>
            <DayView
              startDayHour={12}
              endDayHour={24}
            />
            <Toolbar />
            {/*} <DateNavigator />
            <TodayButton />
            <Appointments />
  <AppointmentTooltip />*/}
          </Scheduler>


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
              {demoContent.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.hour}
                  </TableCell>
                  <TableCell>
                    {row.table}
                  </TableCell>
                  <TableCell>
                    {row.tableStatus && (
                      <Button to={`${process.env.PUBLIC_URL}/waiter/order/${row.order}`}>
                        {row.order}
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    {renderActions(row.status)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Paper>
    </Container>
  );
};



export default Tables;