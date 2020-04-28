import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { campaignsLoading } from '../../../common/redux/organization/organization.selectors';
import WithMiniWrapper from '../with-spinner/with-mini-spinner';
import OrganizationCampaigns from './organization.campaigns';

const mapStateToProps = createStructuredSelector({
  miniLoading: campaignsLoading,
});

const CampaignsOverview = compose(
  connect(mapStateToProps),
  WithMiniWrapper
)(OrganizationCampaigns);

export default CampaignsOverview;