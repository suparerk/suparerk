import moveCard from './moveCard'

describe('moveCard', () => {
  const cards = {
    c1: {
      id: 'c1',
      title: 'card1',
      placeId: 'c2',
    },
    c2: {
      id: 'c2',
      title: 'card2',
      placeId: 'c1',
    },
  }

  const places = {
    c1: {
      id: 'c1',
      cardId: 'c2',
    },
    c2: {
      id: 'c2',
      cardId: 'c1',
    },
  }

  const state = {
    cards,
    places,
  }

  const actual = moveCard(state, 'c1', 'c1')


  it('should update cards correctly', () => {
    const { cards: movedCards } = actual
    const expected = {
      c1: {
        ...cards.c1,
        placeId: 'c1',
      },
      c2: {
        ...cards.c2,
        placeId: 'c2',
      },
    }
    expect(movedCards).toEqual(expected)
  })

  it('should update places correctly', () => {
    const { places: movedPlaces } = actual
    const expected = {
      c1: {
        ...places.c1,
        cardId: 'c1',
      },
      c2: {
        ...places.c2,
        cardId: 'c2',
      },
    }
    expect(movedPlaces).toEqual(expected)
  })
})
