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
  componentDidMount = async () => {
    this.setState({ data: await this.getData() })
  }
  getData = async () => {
    let data =  (await axios.get('/sample')).data
    console.log(data)
    return data
  }

  render() {
    const socket = socketIOClient(this.state.endpoint)

    socket.on('update sample', async () => {
      let data = await this.getData()
      this.setState({ data })
    })

    return (
      <div>
        <ol>
        {
          this.state.data === undefined || this.state.data.length > 0 ?
            this.state.data.map((value, key) => {
              return <li key={key}> { `${value.last_name}, ${value.first_name}` } </li>
            }) : ''
        }
        </ol>
      </div>
    )
  }
}

export default App;
