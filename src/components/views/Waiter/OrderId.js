import React from 'react';
import styles from './Waiter.module.scss';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';

const OrderId = () => {
  return (
    <Container maxWidth='lg'>
      <Toolbar />
      <Paper className={styles.component}>
        <h2>order id view</h2>
      </Paper>
    </Container>
  );
};

export default OrderId;