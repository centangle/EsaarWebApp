import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { attachmentsLoading } from '../../../common/redux/campaign/campaign.selectors';
import WithMiniWrapper from '../with-spinner/with-mini-spinner';
import CampaignAttachments from './campaign.attachments';

const mapStateToProps = createStructuredSelector({
  miniLoading: attachmentsLoading,
});

const AttachmentsOverview = compose(
  connect(mapStateToProps),
  WithMiniWrapper
)(CampaignAttachments);

export default AttachmentsOverview;