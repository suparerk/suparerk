import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as wordActions from '../../reducers/word'

import Word from './Word'

const { string, func } = PropTypes
const propTypes = {
  input: string.isRequired,
  wordSubmit: func.isRequired,
}

const WordContainer = ({ input, wordSubmit }) => (
  <Word input={input} submit={wordSubmit} />
)

WordContainer.propTypes = propTypes

const mapState = state => state.word
const bindActions = dispatch => bindActionCreators(wordActions, dispatch)
export default connect(mapState, bindActions)(WordContainer)
