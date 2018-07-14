import React, { Component } from 'react'
import axios from 'axios'
import socketIOClient from 'socket.io-client'
import * as config from './../../../config.json'

class {{component_name}} extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      endpoint: `${config.host}:${config.backend_port}`,
    }
  }

  componentDidMount() {
    axios.get('/api/{{resource_name}}').then(data => {
      data = data.data
      this.setState({ data })
    })
  }

  render() {
    const socket = socketIOClient(this.state.endpoint)

    socket.on('update {{resource_name}}', () => {
      let data = axios.get('/api/{{resource_name}}').then(data => {
        data = data.data
        this.setState({ data })
      })
    })

    return(
      <div>
        <h1> {{component_name}} (SocketIO enabled) </h1>
        <ul>
          {
            this.state.data === undefined || this.state.data.length > 0 ?
              this.state.data.map((value, key) => {
                return <li key={key}> { `${value.last_name}, ${value.first_name}` } </li>
              }) : 'Fetching resource...'
          }
        </ul>
      </div>
    )
  }
}

export default {{component_name}}