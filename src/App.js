import React, {Component} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomLayout from "./containers/Layout";
import BaseRouter from "./routes";

class App extends Component {
  render() {
    return (
        <Router>
          <CustomLayout>
              <BaseRouter />
          </CustomLayout>
        </Router>
    );
  }
}

export default App;
