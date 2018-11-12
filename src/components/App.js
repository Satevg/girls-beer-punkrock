import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import DefaultLayout from "../components/layout/Default";

import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <DefaultLayout>
                            <Routes />
                        </DefaultLayout>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
