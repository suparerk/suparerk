import React, { Component } from 'react'
import './App.css'
// import Test from './components/Test'
import Word from './components/Word'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Word originalWord="hello" />
      </div>
    )
  }
}

export default App
