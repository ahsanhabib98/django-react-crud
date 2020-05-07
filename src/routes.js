import React from "react";
import Hoc from "./hoc/hoc";
import {Route} from "react-router-dom";
import ArticleList from "./containers/ArticleListView";
import ArticleDetail from "./containers/ArticleDetailView";
import LoginForm from "./containers/Login";
import SignupForm from "./containers/Signup";

const BaseRouter = () => (
    <Hoc>
        <Route exact path="/" component={ArticleList} />
        <Route exact path="/:articleID/detail" component={ArticleDetail} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/signup" component={SignupForm} />
    </Hoc>
);

export default BaseRouter;