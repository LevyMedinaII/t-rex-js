import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import socketIOClient from 'socket.io-client'
import * as config from './../../config.json'

class App extends Component {
  render() {
    return (<div><h1> Hello World </h1></div>)
  }
}

ReactDOM.render(<App />, document.getElementById('root'))