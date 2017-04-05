import React, { PropTypes } from 'react'

const { array, func, string, object } = PropTypes

const propTypes = {
  cards: object.isRequired,
  available: array.isRequired,
  placed: array.isRequired,
  // input: string.isRequired,
  // inputArray: array.isRequired,
  // markIt: func.isRequired,
  // shuffled: array.isRequired,

}

const colors = {
  true: 'green',
  false: 'red',
}

const Letter = ({ letter, state }) => (
  <span className={`card ${colors[state]}`}>{letter}</span>
)

const MarkButton = ({ markIt }) => (
  <button onClick={markIt}>Mark</button>
)

const Word = ({
  cards,
  completed,
  available,
  placed,
}) => (
  <div className="App w3-content w3-padding-128">
    <div className="w3-row-padding">
      <div className="w3-container w3-twothird">
      </div>
    </div>
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


export default Word
