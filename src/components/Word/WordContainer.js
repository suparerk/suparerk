import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as wordActions from '../../reducers/word'

import Word from './Word'

const { array, func, object, string } = PropTypes
const propTypes = {
  // initialize: func.isRequired,
  // input: string.isRequired,
  // inputArray: array.isRequired,
  // markIt: func.isRequired,
  // shuffled: array.isRequired,
  // now: object.isRequired,
  originalWord: string.isRequired,
  cards: object.isRequired,
  available: array.isRequired,
  placed: array.isRequired,
  initialize: func.isRequired,
  letterSubmit: func.isRequired,
}
class WordContainer extends React.Component {
  constructor() {
    super()
    this.bound_handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentDidMount() {
    this.props.initialize(this.props.originalWord)
    document.addEventListener('keydown', this.bound_handleKeyDown)
  }

  handleKeyDown({ key }) {
    this.props.letterSubmit(key)
  }

  render() {
    const { cards, placed, available } = this.props

    return (
      <Word
        // originalWord={this.props.originalWord}
        cards={cards}
        available={available}
        placed={placed}
      />
    )
  }
}
// const WordContainer = ({ input, wordSubmit }) => (
//   <Word input={input} submit={wordSubmit} />
// )

WordContainer.propTypes = propTypes

const mapState = state => state.word.now
const bindActions = dispatch => bindActionCreators(wordActions, dispatch)
export default connect(mapState, bindActions)(WordContainer)
