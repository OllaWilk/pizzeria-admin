import React from 'react';
import styles from './Homepage.module.scss';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import List from '@material-ui/core/List';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Toolbar from '@material-ui/core/Toolbar';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

//import { DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
//import DateFnsUtils from '@date-io/date-fns';

const bookings = [
  {id: 1, name: 'Ola', phone: '12365478', hour: '12:00', table: 1, ppl: 1},
  {id: 2, name: 'Agnieszka', phone: '78542479', hour: '12:30', table: 2, ppl: 2},
  {id: 3, name: 'Kamil', phone: '19487515', hour: '13:00', table: 2, ppl: 3},
];

const events = [
  {id: 1, name: 'Święto ziemniaka', hour: '12:00', table: 1, ppl: 1},
  {id: 2, name: 'muminki', hour: '12:30', table: 2, ppl: 2},
];

const orderStats = [
  {id: 1, value: 111},
  {id: 2, value: 55},
  {id: 3, value: 123},
  {id: 4, value: 76},
];

const Homepage = () => {

  const [open, setOpen] = React.useState(true);
  //const [selectedDate, setSelectedDate] = React.useState(new Date());
  const handleClick = () => {
    setOpen(!open);
  };
  //const handleDateChange = date => {
  // setSelectedDate(date);
  //};

  return (
    <Container maxWidth='lg'>
      <Toolbar />
      <Paper className={styles.component}>
        <div className={styles.heading}>
          <h2>Statistics</h2>

          {/*<MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              className={styles.datePicker}
              value={selectedDate}
              onChange={handleDateChange}
              animateYearScrolling
            />
            <TimePicker
              clearable
              ampm={false}
              value={selectedDate}
              onChange={handleDateChange}
            />
          </MuiPickersUtilsProvider>
          */}
          
          <ListItem>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>OrderNo</TableCell>
                  <TableCell>Order value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderStats.map(row => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ListItem>
        </div>
      </Paper>

      <Divider />

      <Paper className={styles.component}>
        <div className={styles.heading}>
          <ListItem button onClick={handleClick}>
            <h2>Table bookings for today</h2>
            <ListItemText  />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={!open} timeout="auto" unmountOnExit>
            <List>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Hour</TableCell>
                    <TableCell>Table</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookings.map(row => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>
                        {row.phone}
                      </TableCell>
                      <TableCell>
                        {row.hour}
                      </TableCell>
                      <TableCell>
                        {row.table}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </List>
          </Collapse>
        </div>
      </Paper>

      <Divider />

      <Paper className={styles.component}>
        <div className={styles.heading}>
          <ListItem button onClick={handleClick}>
            <h2>Events for today</h2>
            <ListItemText  />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={!open} timeout="auto" unmountOnExit>
            <List>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Hour</TableCell>
                    <TableCell>Table</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {events.map(row => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell>
                        {row.name}
                      </TableCell>
                      <TableCell>
                        {row.hour}
                      </TableCell>
                      <TableCell>
                        {row.table}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </List>
          </Collapse>
        </div>
      </Paper>
      
      <Toolbar />
    </Container>
  );
};

export default Homepage;