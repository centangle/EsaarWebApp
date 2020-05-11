import React, { lazy, Suspense,useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Spinner from './web/components/spinner/spinner.component';
import ErrorBoundary from './web/components/error-boundary/error-boundary.component';

import './App.scss';
import Header from './web/components/header/header.component';
import HomePage from './web/pages/home.page';
import LoginPage from './web/pages/login.page';

import {checkSession} from './common/redux/user/user.actions';

function App({ user,checkSession }) {
    useEffect(() => {
    checkSession();
  }, [checkSession]);
  if (user) {
    return (
      <div className="App">
        <Header />
        <div className='page'>
          <Switch>
            <ErrorBoundary>
              <Suspense fallback={<Spinner />}>
                <Route path="/" component={HomePage} />
              </Suspense>
            </ErrorBoundary>
          </Switch>
        </div>
        
      </div>
    );
  }
  return (
    <Switch>
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Route path="/" component={LoginPage} />
        </Suspense>
      </ErrorBoundary>
    </Switch>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
  }
}
const mapDispatch = (dispatch) => {
  return {
    dispatch,
    checkSession: () => dispatch(checkSession()),
  };
};
export default connect(mapStateToProps,mapDispatch)(App);
