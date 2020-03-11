import React from "react";
import Hoc from "./hoc/hoc";
import {Route} from "react-router-dom";
import ArticleList from "./containers/ArticleListView";
import ArticleDetail from "./containers/ArticleDetailView";

const BaseRouter = () => (
    <Hoc>
        <Route exact path="/" component={ArticleList} />
        <Route exact path="/:articleID/detail" component={ArticleDetail} />
    </Hoc>
);

export default BaseRouter;