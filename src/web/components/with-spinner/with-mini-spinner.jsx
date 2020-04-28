import React from 'react';
import { SpinnerSmall } from '../spinner/spinner.component';
const Spin = ()=>{
    return(
        <SpinnerSmall />
    )
}
const WithMiniWrapper = WrappedComponent => ({ miniLoading, ...otherProps }) => {
  return miniLoading ? <Spin /> : <WrappedComponent {...otherProps} />;
};
export default WithMiniWrapper;