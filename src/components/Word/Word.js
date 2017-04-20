import React, { Component, PropTypes } from 'react'
import Card from '../Card'
import Place from '../Place'

const { object } = PropTypes

const propTypes = {
  cards: object.isRequired,
}

const defaultProps = {
  completed: undefined,
}

class Word extends Component {
  render() {
    const { cards, move, places, position } = this.props
    return (
      <div className="App w3-content w3-padding-128">
        {/* {JSON.stringify(completed)} */}
        <hr />
        <div className="flex">
          {
            Object.keys(places).map((id, index) => {
              const place = places[id]
              return (
                <Place
                  key={id}
                  {...place}
                  onMove={({ sourceId, targetId }) =>
                  move(sourceId, targetId)}
                >
                  <Card
                    active={index < position}
                    {...cards[place.cardId]}
                  />
                </Place>
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
