import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { officesLoading } from '../../../common/redux/campaign/campaign.selectors';
import WithMiniWrapper from '../with-spinner/with-mini-spinner';
//import WithSpinner from '../with-spinner/with-spinner.component';
import CampaignOffices from './campaign.offices';

const mapStateToProps = createStructuredSelector({
  miniLoading: officesLoading,
  //isLoading:officesLoading
});

const OfficesOverview = compose(
  connect(mapStateToProps),
  WithMiniWrapper
)(CampaignOffices);

export default OfficesOverview;