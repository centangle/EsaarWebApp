import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { attachmentsLoading } from '../../../common/redux/organization/organization.selectors';
import WithMiniWrapper from '../with-spinner/with-mini-spinner';
import OrganizationAttachments from './organization.attachments';

const mapStateToProps = createStructuredSelector({
  miniLoading: attachmentsLoading,
});

const AttachmentsOverview = compose(
  connect(mapStateToProps),
  WithMiniWrapper
)(OrganizationAttachments);

export default AttachmentsOverview;