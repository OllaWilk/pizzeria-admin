import React from 'react';
import styles from './Tables.module.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Tables = (id) => {
  return (
    <div className={styles.component}>
      <h2>Tables view</h2>
      <p>wybór daty i godziny</p>
      <p>tabela z listą rezerwacji oraz wydarzeń</p>

      <Link to={`${process.env.PUBLIC_URL}/tables/booking/${id}`}>Booking Id * </Link>
      <Link to={`${process.env.PUBLIC_URL}/tables/booking/new`}>Booking New * </Link>
      <Link to={`${process.env.PUBLIC_URL}/tables/events/${id}`}>Event Id * </Link>
      <Link to={`${process.env.PUBLIC_URL}/tables/events/new`}>Event New * </Link>

    </div>
  );
};

Tables.propTypes= {
  id: PropTypes.string,
};

export default Tables;