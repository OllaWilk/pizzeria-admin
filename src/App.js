import React from 'react';
import { BrowserRouter, Switch, Route }  from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import MainLayout from './components/layout/MainLayout/MainLayout';

import Homepage from './components/views/Homepage/Homepage';
import Login from './components/views/Login/Login';
import Kitchen from './components/views/Kitchen/Kitchen';
import Tables from './components/views/Tables/Tables';
import Waiter from './components/views/Waiter/Waiter';

import OrderNew from './components/views/Waiter/OrderNew';
import OrderId from './components/views/Waiter/OrderId';

import BookingNew from './components/views/Tables/BookingNew';
import BookingId from './components/views/Tables/BookingId';
import EventsNew from './components/views/Tables/EventsNew';
import EventsId from './components/views/Tables/EventsId';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2B4C6F' },
    secondary: { main: '#117c17' },
  },
});

function App() {
  return (
    <BrowserRouter basename={'/panel'}>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <MainLayout>
            <Switch>
              <Route exact path={`${process.env.PUBLIC_URL}/`} component={Homepage} />
              <Route exact path={process.env.PUBLIC_URL + '/login'} component={Login} />
              <Route exact path={process.env.PUBLIC_URL + '/tables'} component={Tables} />
              <Route exact path={process.env.PUBLIC_URL + '/waiter'} component={Waiter} />
              <Route exact path={process.env.PUBLIC_URL + '/kitchen'} component={Kitchen} />

              <Route exact path={`${process.env.PUBLIC_URL}/waiter/order/new`} component={OrderNew}/>
              <Route exact path={`${process.env.PUBLIC_URL}/waiter/order/:id`} component={OrderId}/>

              <Route exact path={`${process.env.PUBLIC_URL}/tables/booking/new`} component={BookingNew}/>
              <Route exact path={`${process.env.PUBLIC_URL}/tables/booking/:id`} component={BookingId}/>
              <Route exact path={`${process.env.PUBLIC_URL}/tables/events/new`} component={EventsNew}/>
              <Route exact path={`${process.env.PUBLIC_URL}/tables/events/:id`} component={EventsId}/>
            </Switch>
          </MainLayout>
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  );
}

export default App;
