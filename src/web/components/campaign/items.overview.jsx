import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { itemsLoading } from '../../../common/redux/campaign/campaign.selectors';
import WithMiniWrapper from '../with-spinner/with-mini-spinner';
import CampaignItems from './campaign.items';

const mapStateToProps = createStructuredSelector({
  miniLoading: itemsLoading
});

const ItemsOverview = compose(
  connect(mapStateToProps),
  WithMiniWrapper
)(CampaignItems);

export default ItemsOverview;