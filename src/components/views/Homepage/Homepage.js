import React from 'react';
import styles from './Homepage.module.scss';

const Homepage = () => {
  return (
    <div className={styles.component}>
      <h2>Homepage view</h2>
      <p> statystyki dzisiejszych zamówień (zdalne i lokalne) </p>
      <p>listę rezerwacji i eventów zaplanowanych na dzisiaj</p>
    </div>
  );
};

export default Homepage;