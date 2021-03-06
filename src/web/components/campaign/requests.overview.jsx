import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { requestsLoading } from '../../../common/redux/campaign/campaign.selectors';
import WithMiniWrapper from '../with-spinner/with-mini-spinner';
//import WithSpinner from '../with-spinner/with-spinner.component';
import CampaignRequests from './campaign.requests';

const mapStateToProps = createStructuredSelector({
  miniLoading: requestsLoading,
  //isLoading:requestsLoading
});

const RequestsOverview = compose(
  connect(mapStateToProps),
  WithMiniWrapper
)(CampaignRequests);

export default RequestsOverview;