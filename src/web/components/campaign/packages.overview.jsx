import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { packagesLoading } from '../../../common/redux/campaign/campaign.selectors';
import WithMiniWrapper from '../with-spinner/with-mini-spinner';
//import WithSpinner from '../with-spinner/with-spinner.component';
import CampaignPackages from './campaign.packages';

const mapStateToProps = createStructuredSelector({
  miniLoading: packagesLoading,
  //isLoading:packagesLoading
});

const PackagesOverview = compose(
  connect(mapStateToProps),
  WithMiniWrapper
)(CampaignPackages);

export default PackagesOverview;