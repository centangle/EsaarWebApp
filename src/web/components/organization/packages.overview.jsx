import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { packagesLoading } from '../../../common/redux/organization/organization.selectors';
import WithMiniWrapper from '../with-spinner/with-mini-spinner';
//import WithSpinner from '../with-spinner/with-spinner.component';
import OrganizationPackages from './organization.packages';

const mapStateToProps = createStructuredSelector({
  miniLoading: packagesLoading,
  //isLoading:packagesLoading
});

const PackagesOverview = compose(
  connect(mapStateToProps),
  WithMiniWrapper
)(OrganizationPackages);

export default PackagesOverview;