import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { isLoading } from '../../../common/redux/setting/setting.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import Campaign from './campaign.component';

const mapStateToProps = createStructuredSelector({
  isLoading: isLoading
});

const CampaignOverview = compose(
  connect(mapStateToProps),
  WithSpinner
)(Campaign);

export default CampaignOverview;