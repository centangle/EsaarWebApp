import React from 'react';

import { SpinnerContainer, SpinnerOverlay,SpinnerSmallOverlay,SpinnerSmallContainer } from './spinner.styles';

const Spinner = () => (
  <SpinnerOverlay>
    <SpinnerContainer />
  </SpinnerOverlay>
);
export const SpinnerSmall = () =>(
  <SpinnerSmallOverlay>
    <SpinnerSmallContainer />
  </SpinnerSmallOverlay>
)
export default Spinner;
