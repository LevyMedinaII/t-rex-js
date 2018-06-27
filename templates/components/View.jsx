import React, { Component } from 'react'
import axios from 'axios'

class View extends Component {
  constructor() {
    data = []
  }
  componentDidMount() {
    axios.get('/resource').then(data => {
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

export default View