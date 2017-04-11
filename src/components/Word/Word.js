import React, { PropTypes } from 'react'

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

const colors = {
  true: 'green',
  false: 'red',
}

const Letter = ({ letter, state }) => (
  <span className={`card ${colors[state]}`}>{letter}</span>
)

const Word = ({
  available,
  cards,
  completed,
  placed,
}) => (
  <div className="App w3-content w3-padding-128">
    {JSON.stringify(completed)}
    <div className="flex">
      {available.map(id =>
        <Letter
          key={id}
          {...cards[id]}
        />)
      }
    </div>
    <hr />
    <div className="flex">
      {placed.map(id =>
        <Letter
          key={id}
          {...cards[id]}
        />)
      }
    </div>

  </div>
)

Word.propTypes = propTypes
Word.defaultProps = defaultProps

export default Word
