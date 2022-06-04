import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { useParams } from "react-router";
import { withRouter } from "react-router";
import Comic from './Comic.js'

class App extends Component {
    render() {
        const Wrapper = (props) => {
            const params = useParams();
            return <Comic  {...{...props, match: {params}} } />
        }
        return ( 
        <div className = "App" >
            <Router>
                <Routes>
                    <Route exact path='/:id' element={<Wrapper />} />
                    <Route exact path='/' element={<Wrapper />} />
                </Routes>
            </Router>
        </div>
        );
    }
}


export default App;