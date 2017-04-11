import React, { Component, PropTypes } from 'react'
import { DragSource } from 'react-dnd'
import { CARD } from '../ItemTypes'


const cardSource = {
  canDrag(props) {
    // You can disallow drag based on props
    return true
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

class Card extends Component {
  render() {
    const colors = {
      true: 'green',
      false: 'red',
    }
    const { letter, state, connectDragSource } = this.props
    return connectDragSource(
      <span className={`card ${colors[state]}`}>{letter}</span>
    )
  }
}

export default DragSource(CARD, cardSource, collect)(Card)
