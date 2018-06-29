import React, { Component } from 'react'
import axios from 'axios'

class {{component_name}} extends Component {
  constructor() {
    data = []
  }
  componentDidMount() {
    axios.get('/api/{{resource}}').then(data => {
      this.setState({ data })
    })
  }
  render() {
    return(
      <div>
        <ul>
          {
            this.state.data === undefined || this.state.data.length > 0 ?
              this.state.data.map((value, key) => {
                return <li key={key}> { `${value.last_name}, ${value.first_name}` } </li>
              }) : ''
          }
        </ul>
      </div>
    )
  }
}

export default {{component_name}}