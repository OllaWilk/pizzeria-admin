import React from 'react';
import styles from './Tables.module.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';


const Tables = (id) => {
  return (
    <div className={styles.component}>
      <h2>Tables</h2>
      <Button component={Link} to={`${process.env.PUBLIC_URL}/tables/booking/${id}`}>Booking Id</Button>
      <Button component={Link} to={`${process.env.PUBLIC_URL}/tables/booking/new`}>New Booking</Button>
      <Button component={Link} to={`${process.env.PUBLIC_URL}/tables/events/${id}`}>Event Id</Button>
      <Button component={Link} to={`${process.env.PUBLIC_URL}/tables/events/new`}>New Event</Button>
    </div>
  );
};

Tables.propTypes= {
  id: PropTypes.string,
};

export default Tables;