import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { accountsLoading } from '../../../common/redux/campaign/campaign.selectors';
import WithMiniWrapper from '../with-spinner/with-mini-spinner';
//import WithSpinner from '../with-spinner/with-spinner.component';
import CampaignAccounts from './campaign.accounts';

const mapStateToProps = createStructuredSelector({
  miniLoading: accountsLoading,
  //isLoading:accountsLoading
});

const AccountsOverview = compose(
  connect(mapStateToProps),
  WithMiniWrapper
)(CampaignAccounts);

export default AccountsOverview;