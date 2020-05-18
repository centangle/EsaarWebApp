import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { campaignsLoading } from '../../../common/redux/campaign/campaign.selectors';
import WithMiniWrapper from '../with-spinner/with-mini-spinner';
import CampaignCampaigns from './campaign.campaigns';

const mapStateToProps = createStructuredSelector({
  miniLoading: campaignsLoading,
});

const CampaignsOverview = compose(
  connect(mapStateToProps),
  WithMiniWrapper
)(CampaignCampaigns);

export default CampaignsOverview;