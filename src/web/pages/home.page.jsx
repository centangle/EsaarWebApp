import React, { useState, useLayoutEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Spinner from '../components/spinner/spinner.component';
import DockSider from '../components/siebar/sidebar.dock.component';
import { PageHolder } from './page.styles';

import Home from '../components/home/home.component';
import OrganizationPage from './organization.page';
import ItemPage from './item.page';
import UomPage from './uom.page';
import RequestPage from './request.page';
import DonationPage from './donation.page';
import Setting from './setting.page';
import EventPage from './event.page';
const HomePage = ({ match }) => {
    const [state, setState] = useState({ position: 'absolute', top: '105px' });
    useLayoutEffect(() => {
        const handleScroll = e => {
            if (window.scrollY >= 70) {
                setState({ ...state, position: 'fixed', top: '80px' });
            } else {
                setState({ ...state, position: 'absolute', top: '105px' });
            }
        }
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, []);
    return (
        <div>
            <PageHolder position={state.position} top={state.top}>
                <DockSider />
                <Suspense fallback={<Spinner />}>
                    <Route
                        exact
                        path={`${match.path}`}
                        component={Home}
                    />
                    <Route
                        exact
                        path="/organizations"
                        component={OrganizationPage}
                    />
                    <Route
                        exact
                        path="/organizations/:id"
                        component={OrganizationPage}
                    />
                    <Route
                        exact
                        path="/organizations/:id/:slug"
                        component={OrganizationPage}
                    />
                    <Route
                        exact
                        path="/items"
                        component={ItemPage}
                    />
                    <Route
                        exact
                        path="/items/:id"
                        component={ItemPage}
                    />
                    <Route
                        exact
                        path="/uoms"
                        component={UomPage}
                    />
                    <Route
                        exact
                        path="/requests"
                        component={RequestPage}
                    />
                    <Route
                        exact
                        path="/requests/:id"
                        component={RequestPage}
                    />
                    <Route
                        exact
                        path="/donation-requests"
                        component={DonationPage}
                    />
                    <Route
                        exact
                        path="/donation-requests/:id"
                        component={DonationPage}
                    />
                    <Route
                        exact
                        path="/settings"
                        component={Setting}
                    />
                    <Route
                        exact
                        path="/events"
                        component={EventPage}
                    />
                </Suspense>
            </PageHolder>
        </div>
    )
}
const mapDispatch = dispatch => ({
    dispatch
});
export default connect(null, mapDispatch)(HomePage);