import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { membersLoading } from '../../../common/redux/organization/organization.selectors';
import WithMiniWrapper from '../with-spinner/with-mini-spinner';
import OrganizationMembers from './organization.members';

const mapStateToProps = createStructuredSelector({
  miniLoading: membersLoading
});

const MembersOverview = compose(
  connect(mapStateToProps),
  WithMiniWrapper
)(OrganizationMembers);

export default MembersOverview;