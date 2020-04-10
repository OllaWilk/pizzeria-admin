import React from 'react';
import styles from './Tables.module.scss';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';

import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';

const currentDate = '2019-06-23' ;
const data = [
  { title: 'Kaja Nowak, table 1, 4ppl',   startDate: '2019-06-23T20:00', endDate: '2019-06-23T21:30' },
  { title: 'Anna Łokieć, table 3, 6ppl',  startDate: '2019-06-23T21:00', endDate: '2019-06-23T22:00' },
  { title: 'Franek Bobek, table 4, 2ppl', startDate: '2019-06-23T12:30', endDate: '2019-06-23T14:30' },
  { title: 'Event 1 , table 3',           startDate: '2019-06-23T18:00', endDate: '2019-06-23T20:00' },
  { title: 'Event 2, table 2',            startDate: '2019-06-23T14:30', endDate: '2019-06-23T19:30' },
];


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
          <h4>Reservations for today</h4>
          <Paper>
            <Scheduler
              data={data}
            >
              <ViewState
                currentDate={currentDate}
              />
              <DayView
                startDayHour={12}
                endDayHour={24}
              />
              <Appointments />
            </Scheduler>
          </Paper>
          <Toolbar />
        </div>
      </Paper>
    </Container>
  );
};



export default Tables;