import { connect } from 'react-redux';
import Waiter from './Waiter';
import { getAll, fetchFromAPI, getLoadingState, changeStatusAndUpdateState, changeStatusAndUpdateState2 } from '../../../redux/tablesRedux';

const mapStateToProps = (state) => ({
  tables: getAll(state),
  loading: getLoadingState(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchTables: () => dispatch(fetchFromAPI()),
  updateStatus: newStatus => dispatch(changeStatusAndUpdateState(newStatus)),
  updateStatus2: (tableID, newStatus) => changeStatusAndUpdateState2(tableID, newStatus, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Waiter);