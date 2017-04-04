import React, { PropTypes } from 'react'

const { array, func, string } = PropTypes

const propTypes = {
  input: string.isRequired,
  inputArray: array.isRequired,
  shuffled: array.isRequired,
  submit: func.isRequired,
}

const Letter = ({ letter }) => {
  return (
    <span className="card">{letter}</span>
  )
}

const Word = ({
  input,
  inputArray,
  shuffled,
  submit }) => {
  const handleInput = (e) => {
    submit(e.target.value)
  }
  return (
    <div className="App w3-content w3-padding-128">
      <div className="w3-row-padding">
        <div className="w3-pink w3-container w3-third">
          <h1>Your word here:</h1>
        </div>
        <div className="w3-container w3-twothird">
          <input
            type="text"
            className="w3-input w3-margin-top"
            onChange={handleInput}
          />
        </div>
      </div>
      <div className="flex">
        {shuffled.map((letter, index) =>
          <Letter
            key={index}
            letter={letter}
          />)}
      </div>
      <div className="flex">
        {inputArray.map(({ letter }, index) =>
          <Letter
            key={index}
            letter={letter}
          />)}
      </div>
    </div>
  )
}
Word.propTypes = propTypes


export default Word
