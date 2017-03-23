import React, { PropTypes } from 'react'

const { string, func } = PropTypes

const propTypes = {
  input: string.isRequired,
  submit: func.isRequired,
}

const Word = ({ input, submit }) => (
  <div className="App w3-content w3-padding-128">
    <div className="w3-row-padding">
      <div className="w3-pink w3-container w3-third">
        <h1>Your word here:</h1>
      </div>
      <div className="w3-container w3-twothird">
        <input
          type="text"
          className="w3-input w3-margin-top"
          onKeyUp={submit}
        />
      </div>
    </div>
    <h2>{input}</h2>
  </div>
)

Word.propTypes = propTypes

export default Word
