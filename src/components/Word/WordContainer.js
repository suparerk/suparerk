import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import * as wordActions from '../../reducers/word'
import Word from './Word'

const { bool, func, number, object, string } = PropTypes
const propTypes = {
  cards: object.isRequired,
  completed: bool,
  deleteIt: func.isRequired,
  dropIt: func.isRequired,
  initialize: func.isRequired,
  position: number.isRequired,
  letterSubmit: func.isRequired,
  markIt: func.isRequired,
  originalWord: string.isRequired,
  slots: object.isRequired,
}

const defaultProps = {
  completed: undefined,
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
    if (key === 'Enter') {
      this.props.markIt(key)
    } else if (key === 'Backspace') {
      this.props.deleteIt(key)
    } else {
      this.props.letterSubmit(key)
    }
  }

  render() {
    const { cards, completed, dropIt, position, slots } = this.props

    return (
      <Word
        cards={cards}
        completed={completed}
        move={dropIt}
        position={position}
        slots={slots}
      />
    )
  }
}

WordContainer.propTypes = propTypes
WordContainer.defaultProps = defaultProps

const mapState = state => state.word.now
const bindActions = dispatch => bindActionCreators(wordActions, dispatch)
const mapReducer = connect(mapState, bindActions)(WordContainer)
export default DragDropContext(HTML5Backend)(mapReducer)
