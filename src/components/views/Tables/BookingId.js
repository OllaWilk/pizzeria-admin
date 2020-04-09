import React from 'react';
import styles from './Tables.module.scss';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';

const BookingId = () => {
  return (
    <Container maxWidth='lg'>
      <Toolbar />
      <Paper className={styles.component}>
        <h2>Booking Id view</h2>
        <p>~zawiera wszystkie informacje dotyczące rezerwacji</p>
        <p>umożliwia edycję i zapisanie zmian</p>
      </Paper>
    </Container>
  );
};

export default BookingId;