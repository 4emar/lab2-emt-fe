import React from "react";
import {Route, Switch, withRouter} from "react-router-dom";
import ResponsiveDrawer from "../../components/Navigation/ResponsiveDrawer";
import "./Layout.css";
import Books from "../../components/Books/Books";
import Categories from "../../components/Categories/Categories";

const Layout = () => {

    let routes = (
        <Switch>
            <Route exact path={["/", "/books"]}>
                <Books/>
            </Route>

            <Route exact path="/categories">
                <Categories/>
            </Route>

            <Route exact path="/login">

            </Route>
        </Switch>
    );

    return (
        <React.Fragment>
            <div id="rootContainer">
                <ResponsiveDrawer/>
                <main id="mainContainer">
                    {routes}
                </main>
            </div>
        </React.Fragment>
    )
};

export default withRouter(Layout);