import React, { Component, PropTypes } from 'react'
import Card from '../Card'

const { array, bool, object } = PropTypes

const propTypes = {
  available: array.isRequired,
  cards: object.isRequired,
  completed: bool,
  placed: array.isRequired,
}

const defaultProps = {
  completed: undefined,
}

class Word extends Component {
  render() {
    const { available, cards, completed, placed } = this.props
    return (
      <div className="App w3-content w3-padding-128">
        {JSON.stringify(completed)}
        <div className="flex">
          {available.map(id =>
            <Card
              key={id}
              {...cards[id]}
            />)
          }
        </div>
        <hr />
        <div className="flex">
          {placed.map(id =>
            <Card
              key={id}
              {...cards[id]}
            />)
          }
        </div>
      </div>
    )
  }
}

Word.propTypes = propTypes
Word.defaultProps = defaultProps

export default Word
