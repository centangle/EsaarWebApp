import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { tasksLoading } from '../../../common/redux/organization/organization.selectors';
import WithMiniWrapper from '../with-spinner/with-mini-spinner';
//import WithSpinner from '../with-spinner/with-spinner.component';
import OrganizationTasks from './organization.tasks';

const mapStateToProps = createStructuredSelector({
  miniLoading: tasksLoading,
  //isLoading:tasksLoading
});

const TasksOverview = compose(
  connect(mapStateToProps),
  WithMiniWrapper
)(OrganizationTasks);

export default TasksOverview;