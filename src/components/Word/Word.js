import React, { Component, PropTypes } from 'react'
import { DragSource } from 'react-dnd'

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

const letterSource = {
  canDrag(props) {
    // You can disallow drag based on props
    return props.draggable
  },
  beginDrag(props) {
    // Return the data describing the dragged item
    const { id } = props
    return { id }
  },
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    canDrag: monitor.canDrag(),
    isDragging: monitor.isDragging(),
  }
}

const colors = {
  true: 'green',
  false: 'red',
}

const Letter = ({ letter, state }) => (
  <span className={`card ${colors[state]}`}>{letter}</span>
)

class Word extends Component {
  render() {
    const { available, cards, completed, placed } = this.props
    return (
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
  }
}

Word.propTypes = propTypes
Word.defaultProps = defaultProps

export default Word
