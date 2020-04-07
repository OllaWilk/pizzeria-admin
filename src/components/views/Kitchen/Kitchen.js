import React from 'react';
import styles from './Kitchen.module.scss';

const Kitchen = () => {
  return (
    <div className={styles.component}>
      <h2>Kitchen view</h2>
      <p>wyświetla listę zamówień w kolejności ich złożenia</p>
      <p>~lista musi zawierać numer stolika(lub zamówenia zdalnego)</p>
      <p>~pełne informacje dot. zamówionych dań</p>
      <p>~na liście musi być możliwość oznaczenia zamówienia jako zrealizowane</p>
    </div>
  );
};

export default Kitchen;