import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import {Jobs} from "./components/job/listing/Jobs";
import {Job} from "./components/job/details/Job";

class AppRouter extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Route path="/" exact component={Jobs}/>
                    <Route path="/job/:id" component={Job}/>
                </div>
            </Router>
        );
    }
}

export default AppRouter;
