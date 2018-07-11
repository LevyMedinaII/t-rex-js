import React, { Component } from 'react'
import axios from 'axios'

class UserView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    axios.get('/api/user').then(data => {
      data = data.data
      this.setState({ data })
    })
  }

  render() {
    return(
      <div>
        <h1> UserView </h1>
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

export default UserView