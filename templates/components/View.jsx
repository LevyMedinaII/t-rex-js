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
      <div></div>
    )
  }
}

export default View