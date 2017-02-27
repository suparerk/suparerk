import React, { PropTypes } from 'react'

const { number, func } = PropTypes

const propTypes = {
  clicks: number.isRequired,
  onClick: func.isRequired,
}

const Test = ({ clicks, onClick }) => (
  <h1 onClick={onClick}>
    Clicks:
    {' '}
    {clicks}
  </h1>
)

Test.propTypes = propTypes

export default Test
