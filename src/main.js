import React, { Component } from 'react' //, PropTypes
import { render } from 'react-dom'

export default class App extends Component {
  render() {
    return <div>Работает!</div>
  }
}

render(
  <App />,
  document.getElementById('root')
)