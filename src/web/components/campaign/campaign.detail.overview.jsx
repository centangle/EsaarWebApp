import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { isLoading } from '../../../common/redux/setting/setting.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import CampaignDetail from './campaign.detail';

const mapStateToProps = createStructuredSelector({
  isLoading: isLoading
});

const CampaignDetailOverview = compose(
  connect(mapStateToProps),
  WithSpinner
)(CampaignDetail);

export default CampaignDetailOverview;