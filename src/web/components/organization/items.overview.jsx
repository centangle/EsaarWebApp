import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { itemsLoading } from '../../../common/redux/organization/organization.selectors';
import WithMiniWrapper from '../with-spinner/with-mini-spinner';
import OrganizationItems from './organization.items';

const mapStateToProps = createStructuredSelector({
  miniLoading: itemsLoading
});

const ItemsOverview = compose(
  connect(mapStateToProps),
  WithMiniWrapper
)(OrganizationItems);

export default ItemsOverview;