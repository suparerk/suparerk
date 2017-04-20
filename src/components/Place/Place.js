import React, { Component, PropTypes } from 'react'
import { DropTarget } from 'react-dnd'
import { CARD } from '../ItemTypes'

const { func } = PropTypes

const propTypes = {
  connectDropTarget: func,
}

const canDropCard = () => true

const placeTarget = {
  canDrop(props, monitor) {
    // const item = monitor.getItem()
    return canDropCard()
  },
  drop(props, monitor) {
    const id = monitor.getItem().id
    props.onMove({ sourceId: id, targetId: props.id })
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


class Place extends Component {
  render() {
    const { connectDropTarget } = this.props
    return connectDropTarget(
      <div>
        <div className="flex place">
          {this.props.children}
        </div>
      </div>
    )
  }
}

Place.propTypes = propTypes


export default DropTarget(CARD, placeTarget, collect)(Place)
