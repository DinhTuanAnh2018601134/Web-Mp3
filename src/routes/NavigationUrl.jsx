import React from 'react';
import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import DetailListMusic from '../pages/detail/DetailListMusic';
import Discover from '../pages/discover/Discover';
import Zingchart from '../pages/zingchart/Zingchart';
import NewMusic from '../pages/newMusic/NewMusic';
import Search from '../pages/search/Search';
import SignIn from '../pages/sign-in/SignIn';
import User from '../pages/user/User';

function NavigationUrl() {
    return (
        <Switch>
            <Redirect exact from="/" to="/discover" />
            <Route path="/discover">
                <Discover />
            </Route>
            <Route path="/zing-chart">
                <Zingchart />
            </Route>
            <Route path="/moi-phat-hanh">
                <NewMusic />
            </Route>
            <Route path="/tim-kiem/:slug">
                <Search />
            </Route>
            <Route path="/dang-nhap">
                <SignIn />
            </Route>
            <Route path="/tai-khoan">
                <User />
            </Route>

            <Route path="/pop-ballad-viet-noi-bat">
                <DetailListMusic />
            </Route>
            <Route path="/chill-cung-rap-viet">
                <DetailListMusic />
            </Route>
            <Route path="/v-pop-hits-quoc-dan">
                <DetailListMusic />
            </Route>
            <Route path="/guitar-v-pop">
                <DetailListMusic />
            </Route>
            <Route path="/rap-viet-ngay-nay">
                <DetailListMusic />
            </Route>
            <Route path="/combo-hits">
                <DetailListMusic />
            </Route>
            <Route path="/bedroom-pop">
                <DetailListMusic />
            </Route>
            <Route path="/edm-now">
                <DetailListMusic />
            </Route>
            <Route path="/top-100-nhac-v-pop-hay-nhat">
                <DetailListMusic />
            </Route>
            <Route path="/top-100-bai-hat-nhac-tre-hay-nhat">
                <DetailListMusic />
            </Route>
            <Route path="/top-100-pop-au-my-hay-nhat">
                <DetailListMusic />
            </Route>
            <Route path="/top-100-nhac-electronicdance-au-my-hay-nhat">
                <DetailListMusic />
            </Route>
            <Route path="/top-100-nhac-han-quoc-hay-nhat">
                <DetailListMusic />
            </Route>
            <Route path="/v-pop-thang-112021">
                <DetailListMusic />
            </Route>
            <Route path="/us-uk-thang-112021">
                <DetailListMusic />
            </Route>
            <Route path="/k-pop-thang-112021">
                <DetailListMusic />
            </Route>
            <Route path="/indie-viet-thang-112021">
                <DetailListMusic />
            </Route>
        </Switch>
    );
}

export default NavigationUrl;