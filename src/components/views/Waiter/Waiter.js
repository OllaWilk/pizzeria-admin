import React from 'react';
import styles from './Waiter.module.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import AddIcon from '@material-ui/icons/Add';

/*const demoContent = [
  {id: '1', status: 'free', order: null},
  {id: '2', status: 'thinking', order: null},
  {id: '3', status: 'ordered', order: 123},
  {id: '4', status: 'prepared', order: 234},
  {id: '5', status: 'delivered', order: 345},
  {id: '6', status: 'paid', order: 456},
];*/


class Waiter extends React.Component
{
  static propTypes = {
    fetchTables: PropTypes.func,
    loading: PropTypes.shape({
      active: PropTypes.bool,
      error: PropTypes.oneOfType([PropTypes.bool,PropTypes.string]),
    }),
    tables: PropTypes.object,
    updateStatus: PropTypes.func,
  }

  componentDidMount() {
    const { fetchTables } = this.props;
    fetchTables();
  }

  renderActions (id, status) {
    switch (status) {
      case 'free':
        return (
          <>
            <Button onClick={() => this.props.updateStatus(id,'thinking')}>thinking</Button>
            <Button onClick={() => this.props.updateStatus(id,'ordered')}>new order</Button>
          </>
        );
      case 'thinking':
        return (
          <Button onClick={() => this.props.updateStatus(id,'ordered')}>new order</Button>
        );
      case 'ordered':
        return (
          <Button onClick={() => this.props.updateStatus(id,'prepared')}>prepared</Button>
        );
      case 'prepared':
        return (
          <Button onClick={() => this.props.updateStatus(id,'delivered')}>delivered</Button>
        );
      case 'delivered':
        return (
          <Button onClick={() => this.props.updateStatus(id,'paid')}>paid</Button>
        );
      case 'paid':
        return (
          <Button onClick={() => this.props.updateStatus(id,'free')}>free</Button>
        );
      default:
        return null;
    }
  }

  render() {
    const { loading: { active, error }, tables } = this.props;
    const tablesArray = Array.from(tables);
    //console.log('tablesArray', tablesArray);

    if(active || !tables.length){

      return (
        <Paper className={styles.component}>
          <p>Loading...</p>
        </Paper>
      );
    } else if(error) {
      return (
        <Paper className={styles.component}>
          <p>Error! Details:</p>
          <pre>{error}</pre>
        </Paper>
      );
    } else {
      return (
        <Container>
          <Toolbar />
          <Paper className={styles.component}>
            <div className={styles.heading}>
              <h2>Waiter</h2>
              {         /*     <Button component={Link} to={`${process.env.PUBLIC_URL}/waiter/order/${row.id}`}>{row.id}</Button>*/}
              <Button color='secondary'  aria-label='add' component={Link} to={`${process.env.PUBLIC_URL}/waiter/order/new`}>
                <AddIcon /> Add New Order
              </Button>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Table</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Order</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tablesArray.map(row => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        <Link to={`${process.env.PUBLIC_URL}/waiter/order/${row.id}`}>{row.id}</Link>
                      </TableCell>
                      <TableCell>
                        {row.status}
                      </TableCell>
                      <TableCell>
                        {row.order && (
                          <Button to={`${process.env.PUBLIC_URL}/waiter/order/${row.order}`}>
                            {row.order}
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>
                        {this.renderActions(row.id, row.status)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Paper>
        </Container>
      );
    }
  }
}


export default Waiter;