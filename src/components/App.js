import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Routes from "./Routes";

import logo from "../logo.svg";
// import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <header className="App-header">
                        <Link to="/">
                            <button>home</button>
                        </Link>
                        <Link to="/favorites">
                            <button>favorites</button>
                        </Link>
                        <Routes />
                    </header>
                </Router>
            </div>
        );
    }
}

export default App;
