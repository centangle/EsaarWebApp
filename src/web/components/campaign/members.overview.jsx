import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { membersLoading } from '../../../common/redux/campaign/campaign.selectors';
import WithMiniWrapper from '../with-spinner/with-mini-spinner';
import CampaignMembers from './campaign.members';

const mapStateToProps = createStructuredSelector({
  miniLoading: membersLoading
});

const MembersOverview = compose(
  connect(mapStateToProps),
  WithMiniWrapper
)(CampaignMembers);

export default MembersOverview;