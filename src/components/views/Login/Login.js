import React from 'react';
import styles from './Login.module.scss';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Link } from 'react-router-dom';

const Login = () => {

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth='lg'>
      <form className={styles.component} autoComplete="off">
        <TextField
          className={styles.textField}
          required
          id="login"
          label="User Name"
        />

        <FormControl className={clsx(styles.textField)}>
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment>
                <Button
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </Button>
              </InputAdornment>
            }
          />
        </FormControl>

        <Button
          className={styles.button}
          variant="contained" color="primary"
          component={Link} to={`${process.env.PUBLIC_URL}/`}
        >
        LOGIN
        </Button>
      </form>
    </Container>

  );
};

export default Login;