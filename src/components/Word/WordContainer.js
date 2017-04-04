import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as wordActions from '../../reducers/word'

import Word from './Word'

const { array, func, object, string } = PropTypes
const propTypes = {
  initialize: func.isRequired,
  input: string.isRequired,
  inputArray: array.isRequired,
  originalWord: string.isRequired,
  shuffled: array.isRequired,
  wordSubmit: func.isRequired,
}
class WordContainer extends React.Component {
  componentDidMount() {
    this.props.initialize(this.props.originalWord)
  }
  render() {
    return (
      <Word
        input={this.props.input}
        inputArray={this.props.inputArray}
        originalWord={this.props.originalWord}
        shuffled={this.props.shuffled}
        submit={this.props.wordSubmit}
      />
    )
  }
}
// const WordContainer = ({ input, wordSubmit }) => (
//   <Word input={input} submit={wordSubmit} />
// )

WordContainer.propTypes = propTypes

const mapState = state => state.word
const bindActions = dispatch => bindActionCreators(wordActions, dispatch)
export default connect(mapState, bindActions)(WordContainer)
