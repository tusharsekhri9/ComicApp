import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { useParams } from "react-router";
import { withRouter } from "react-router";

export class Comic extends Component {

    constructor(props) {
        super(props);
        
        let comicID = parseInt(this.props.match.params.id);
        this.state = {
            
            comicID: comicID,
            img: null
        };
    }

    comicViewed = async function(comicID) {
        axios
            .get('https://xkcd.com/' + comicID + '/info.0.json')
            .then(res => {  
                this.setState({img: res.data.img});
            });
    };



    async componentDidMount() {
    
        if (isNaN(this.state.comicID)) {
            axios
                .get('https://xkcd.com/info.0.json')
                .then(res => {  
                    this.setState({maxComicID: parseInt(res.data.num)});
            });
        }
        this.comicViewed(this.state.comicID);

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.comicID !== this.state.comicID) {
            if (isNaN(this.state.comicID)) {
                this.setState({comicID: this.state.maxComicID});
            }
            this.comicViewed(this.state.comicID);
        }
    }

    render() {
        return ( 
        <div>
            <h1> {this.state.comicID} </h1>
            <img src={this.state.img}/>
            <br />
            <button type="button" onClick={event =>  window.location.href='/' + (this.state.comicID - 1)}>Prev</button>
            <button type="button" onClick={event =>  window.location.href='/' + (this.state.comicID + 1)}>Next</button>    
        </div>
        );
    }
}
/*
 <button type="button" onClick={this.buttonPrev}>Prev</button>
            <button type="button" onClick={this.buttonNext}>Next</button>
            onClick={event =>  window.location.href='/your-href'}
            */

export default Comic;