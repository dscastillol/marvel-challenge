import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import TopBar from "../../components/topBar/index.js";

import axios from 'axios';
import md5 from 'md5';

const privateKey = "b7d2bef1b3feb2720bc188c77d16f7f2c624b126";
const publicKey = "e1b384507a43560a8dd97f899ba78e7e";
const t = 1;

const hash = md5(1+privateKey+publicKey);

class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
      
      auth : "",
      allChars : []
    }

  }

  async componentDidMount(){

    let ids = Array.from({length: 15}, (v, k) => k)
    Promise.all(ids.map(id => this.getCharacter(id)))
  }

  getCharacter = async i => {
    let { allChars } = this.state;
    let res = await axios.get("https://gateway.marvel.com:443/v1/public/characters?limit=100&offset="+ i*100 + "&ts=1&apikey=" + publicKey + "&hash=" + hash);
    allChars.push(res);
    this.setState({ allChars });
  };

  printState(){
    console.log(this.state.allChars[0]);
    
  }

  render() {
    return(
      <>
        <TopBar/>

        {this.state.allChars.map((row, index) =>(
          <div key = {index}> {row[index].name} </div>
        ))}

        <Button onClick={()=> this.printState()}>GENERAR</Button>
      </>

    );
  }
}

export default Home;
