import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { accountsLoading } from '../../../common/redux/organization/organization.selectors';
import WithMiniWrapper from '../with-spinner/with-mini-spinner';
//import WithSpinner from '../with-spinner/with-spinner.component';
import OrganizationAccounts from './organization.accounts';

const mapStateToProps = createStructuredSelector({
  miniLoading: accountsLoading,
  //isLoading:accountsLoading
});

const AccountsOverview = compose(
  connect(mapStateToProps),
  WithMiniWrapper
)(OrganizationAccounts);

export default AccountsOverview;