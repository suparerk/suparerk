import React, { Component, PropTypes } from 'react'
import Card from '../Card'
import Slot from '../Slot'

const { object } = PropTypes

const propTypes = {
  cards: object.isRequired,
}

const defaultProps = {
  completed: undefined,
}

class Word extends Component {
  render() {
    const { cards, move, slots, position } = this.props
    return (
      <div className="App w3-content w3-padding-128">
        {/* {JSON.stringify(completed)} */}
        <hr />
        <div className="flex">
          {
            Object.keys(slots).map((id, index) => {
              const slot = slots[id]
              return (
                <Slot
                  key={id}
                  {...slot}
                  onMove={({ sourceId, targetId }) =>
                  move(sourceId, targetId)}
                >
                  <Card
                    active={index < position}
                    {...cards[slot.cardId]}
                  />
                </Slot>
              )
            })
          }
        </div>
      </div>
    )
  }
}

Word.propTypes = propTypes
Word.defaultProps = defaultProps

export default Word
