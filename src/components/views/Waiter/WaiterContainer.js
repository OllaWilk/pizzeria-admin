import { connect } from 'react-redux';
import Waiter from './Waiter';
import { getAll, fetchFromAPI, getLoadingState, fetchUpdateStatus } from '../../../redux/tablesRedux';

const mapStateToProps = (state,) => ({
  tables: getAll(state),
  loading: getLoadingState(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchTables: () => dispatch(fetchFromAPI()),
  updateStatus: (tableID, newStatus) => dispatch(fetchUpdateStatus(tableID, newStatus)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Waiter);