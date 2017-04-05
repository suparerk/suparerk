import React, { PropTypes } from 'react'

const { array, func, string } = PropTypes

const propTypes = {
  input: string.isRequired,
  inputArray: array.isRequired,
  markIt: func.isRequired,
  shuffled: array.isRequired,
  submit: func.isRequired,

}

const colors = {
  true: 'green',
  false: 'red',
}

const Letter = ({ letter, check }) => (
  <span className={`card ${colors[check]}`}>{letter}</span>
)

const MarkButton = ({  markIt  }) => (
  <button onClick={markIt}>Mark</button>
)

const Word = ({
  input,
  inputArray,
  shuffled,
  submit,
  markIt,
}) => (
  <div className="App w3-content w3-padding-128">
    <div className="w3-row-padding">
      <div className="w3-pink w3-container w3-third">
        <h1>Your word here:</h1>
      </div>
      <div className="w3-container w3-twothird">
        <input
          type="text"
          className="w3-input w3-margin-top"
          onChange={e => submit(e.target.value)}
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
      {inputArray.map(({ letter, check }, index) =>
        <Letter
          key={index}
          letter={letter}
          check={check}
        />)}
    </div>
    <MarkButton
      markIt={markIt}
    />
  </div>
)

Word.propTypes = propTypes


export default Word
