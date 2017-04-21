const handleDrop = ({ cards, places }, { targetId, sourceId }) => {
  const sourceCard = { ...cards[sourceId] }
  const targetPlace = { ...places[targetId] }
  const newPlace = sourceCard.placeId && {
    [sourceCard.placeId]: {
      ...places[sourceCard.placeId],
      cardId: targetPlace.cardId,
    },
  }
  const newCard = targetPlace.cardId && {
    [targetPlace.cardId]: {
      ...cards[targetPlace.cardId],
      placeId: sourceCard.placeId,
    },
  }
  const oldPlace = {
    [targetId]: {
      ...places[targetId],
      cardId: sourceId,
    },
  }
  const oldCard = {
    [sourceId]: {
      ...cards[sourceId],
      placeId: targetId,
    },
  }
  const newState = {
    places: {
      ...places,
      ...newPlace,
      ...oldPlace,
    },
    cards: {
      ...cards,
      ...newCard,
      ...oldCard,
    },
  }

  return newState
}

export default handleDrop
