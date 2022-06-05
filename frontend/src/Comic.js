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
            img: null,
            date: null,
            transcript: null,
            famousComics: null
        };
        this.maxComicID = comicID;
    }

    comicViewed = async function(comicID) {
        axios
            .get('https://xkcd.com/' + comicID + '/info.0.json')
            .then(res => {  
                this.setState({img: res.data.img, date: res.data.day + '/' + res.data.month + '/' + res.data.year, transcript: res.data.transcript});
            });
    };
/*
    async componentDidMount() {
        // find Max
        this.comicViewed(this.state.comicID);
        axios
            .get('https://xkcd.com/info.0.json')
            .then(res => {  
                this.setState({maxComicID: parseInt(res.data.num)}, async function() {
                    console.log("11")
                    console.log(this.state)
                    if (isNaN(this.state.comicID)) {
                        console.log("12")
                        this.setState({comicID: this.state.comicID}, async function() {
                            this.comicViewed(this.state.comicID);

                        })
                    } else {
                        this.comicViewed(this.state.comicID);
                    }
                });
        });
    }
*/

/*
    findMax = async function() {
        axios
            .get('https://xkcd.com/info.0.json')
            .then(res => {
                this.maxComicID = parseInt(res.data.num)
                if (isNaN(this.state.comicID)) {
                    this.state.comicID = this.maxComicID
                }
        });
    }
*/

    async componentDidMount() {
        // find Max
        console.log("11")
        await axios
            .get('https://xkcd.com/info.0.json')
            .then(res => {  
                console.log("12")
                this.maxComicID = parseInt(res.data.num)
                console.log(this.maxComicID);
                });

        if (isNaN(this.state.comicID) || (this.state.comicID < 1) || (this.state.comicID > this.maxComicID)) {
            window.location.href='/' + this.maxComicID
        } else {
            await axios
                .post('/comic', {comicID: this.state.comicID})
                .then(res => {
                    console.log(res.data.famousComics)  
                    this.setState({famousComics: res.data.famousComics})
                    });
            this.comicViewed(this.state.comicID)
        }
    }

/*
    componentDidUpdate(prevProps, prevState) {
        if (prevState.comicID !== this.state.comicID) {
            this.comicViewed(this.state.comicID);
        }
    }


                            for(let i = 0; i < this.state.famousComics.length, i++) {
                            <tr> <th>{this.state.famousComics[i][0]}</th> <th>{this.state.famousComics[i][1]}</th> </tr>
                        }
*/
    

    render() {
        let displayTranscript = () => {
            if (this.state.transcript) {
                let splitTranscript = this.state.transcript.split("\n");      
                return <div className="transcript">  {splitTranscript.map(function(line, i) {
                            if (! line.startsWith("{{")) {
                                return <p key={i}> {line} </p>;
                            }
                    })} </div>
            }
        }

        let famousComics = () => {
            if (this.state.famousComics) {  
                return <div className="famousComics">  
                    <h4> Most famous comics </h4>
                {
                    <table>
                        <thead>
                        <tr><th>Id</th><th>Count</th></tr>
                        </thead>
                        <tbody>
                    { 
                        this.state.famousComics.map(function(item, i) {
                            return <tr key={i}><td> {item[0]} </td><td> {item[1]} </td></tr>;
                        })
                    }
                        </tbody>
                    </table>
                } </div>
            }
        }
        
        return ( 
        <div>
            <h2> Comic ID: {this.state.comicID} </h2>
            <h3> Date created: {this.state.date} </h3>
            <img src={this.state.img}/>
            { displayTranscript() }
            { famousComics() }
            <div className="buttonInlineDiv">
            <div className="buttonDiv buttonInline">
            <button disabled={this.state.comicID == 1}  type="button" onClick={event =>  window.location.href='/' + (this.state.comicID - 1)}>Prev</button>
            </div>
            <div  className="buttonDiv buttonInline">
            <button disabled={this.state.comicID == this.maxComicID}  type="button" onClick={event =>  window.location.href='/' + (this.state.comicID + 1)}>Next</button>    
            </div>
            </div>
            
            <div className="buttonDiv">
            <button  type="button" onClick={event =>  window.location.href='/' + (Math.floor(Math.random() * this.maxComicID))}>Random</button>    
            </div>
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