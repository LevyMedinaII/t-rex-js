import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';

class App extends Component {
  constructor() {
    super()

    this.state = {
      endpoint: "http://localhost:5001",
      color: 'white',
      data: [],
    }
  }
  componentDidMount() {
    this.setState({ data: this.getData() })
  }
  getData = async () => {
    return await axios.get('http://localhost:5001/sample')
  }
  send = () => {
    const socket = socketIOClient(this.state.endpoint)
    socket.emit('change color', this.state.color)
  }

  setColor = (color) => {
    this.setState({ color })
  }

  render() {
    const socket = socketIOClient(this.state.endpoint)
    socket.on('update sample', async () => { this.setState({ data: await this.getData() }) })

    return (
      <div>
        <ol>
        {
          this.state.data.length > 0 ?
            this.state.data.map((value, key) => {
              return <li> { value } </li>
            }) : ''
        }
        </ol>
      </div>
    )
  }
}

export default App;
