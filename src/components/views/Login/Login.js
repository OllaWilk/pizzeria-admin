import React from 'react';
import styles from './Login.module.scss';

const Login = () => {
  return (
    <div className={styles.component}>
      <h2>Login view</h2>
      <p>  pola na login i hasło</p>
      <p>guzik do zalogowania (link do dashboardu)</p>
    </div>
  );
};

export default Login;