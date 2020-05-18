import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { regionsLoading } from '../../../common/redux/campaign/campaign.selectors';
import WithMiniWrapper from '../with-spinner/with-mini-spinner';
//import WithSpinner from '../with-spinner/with-spinner.component';
import CampaignRegions from './campaign.regions';

const mapStateToProps = createStructuredSelector({
  miniLoading: regionsLoading,
  //isLoading:regionsLoading
});

const RegionsOverview = compose(
  connect(mapStateToProps),
  WithMiniWrapper
)(CampaignRegions);

export default RegionsOverview;