import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import socketIOClient from 'socket.io-client'
import axios from 'axios'
import * as config from './../../config.json'

class App extends Component {
  constructor() {
    super()

    this.state = {
      endpoint: `http://localhost:${config.backend_port}`,
      data: [],
    }
  }
  componentDidMount = async () => {
    this.setState({ data: await this.getData() })
  }
  
  getData = async () => {
    let data =  (await axios.get('/api/sample')).data
    return data
  }

  render() {
    const socket = socketIOClient(this.state.endpoint)

    socket.on('update sample', async () => {
      let data = await this.getData()
      this.setState({ data })
    })

    const App = () => {
      return <div>Hello World!</div>
    }

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

ReactDOM.render(<App />, document.getElementById('root'))