import React, { Component, PropTypes } from 'react'
import Card from '../Card'
import Slot from '../Slot'
import map from 'lodash/map'

const { array, bool, object } = PropTypes

const propTypes = {
  available: array.isRequired,
  cards: object.isRequired,
  completed: bool,
}

const defaultProps = {
  completed: undefined,
}

class Word extends Component {
  render() {
    const { available, cards, completed, move, slots, position } = this.props
    return (
      <div className="App w3-content w3-padding-128">
        {/* {JSON.stringify(completed)} */}
        {/* <div className="flex">
          {available.map(id =>
            <Card
              key={id}
              {...cards[id]}
            />)
          }
        </div> */}
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
                <div>

                </div>
              </Slot>
            )
          })}
        </div>
      </div>
    )
  }
}

Word.propTypes = propTypes
Word.defaultProps = defaultProps

export default Word
