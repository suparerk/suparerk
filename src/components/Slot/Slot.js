import React, { Component, PropTypes } from 'react'
import { DropTarget } from 'react-dnd'
import { CARD } from '../ItemTypes'

const { func } = PropTypes

const propTypes = {
  connectDropTarget: func,
}

const canDropCard = () => true

const slotTarget = {
  canDrop(props, monitor) {
    const item = monitor.getItem()
    return canDropCard()
  },
  drop(props, monitor) {
    const id = monitor.getItem().id
    // props.onMove({ sourceId: id, targetId: props.id })
  },
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
  }
}


class Slot extends Component {
  render() {
    const { connectDropTarget } = this.props
    return connectDropTarget(
      <div>
        <div className="flex slot">
          {this.props.children}
        </div>
      </div>
    )
  }
}

Slot.propTypes = propTypes


export default DropTarget(CARD, slotTarget, collect)(Slot)
