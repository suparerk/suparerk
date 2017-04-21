const moveCards = (state, sourceId, targetId) => {

  const { cards, places: places } = state
  const card = cards[sourceId]
  const place = places[targetId]
  const { cardId: oldCardId } = place
  const { placeId: oldPlaceId } = card
  const newCard = { [card.id]: { ...card, placeId: place.id } }
  const newPlace = { [place.id]: { ...place, cardId: card.id } }
  const oldCard = { id: null, ...cards[oldCardId] }
  const oldPlace = { id: null, ...places[oldPlaceId] }
  const newOldCard = oldCard.id ? { [oldCardId]: { ...oldCard, placeId: oldPlace.id } } : {}
  const newOldPlace = oldPlace.id ? { [oldPlaceId]: { ...oldPlace, cardId: oldCard.id } } : {}
  return {
    ...state,
    cards: {
      ...cards,
      ...newCard,
      ...newOldCard,
    },
    places: {
      ...places,
      ...newPlace,
      ...newOldPlace,
    },
  }
}

export default moveCards
