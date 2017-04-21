import movedCards from './moveCards'

describe('handleDrop', () => {
  const cards = {
    c1: {
      id: 'c1',
      title: 'card1',
      placeId: 's2',
    },
    c2: {
      id: 'c2',
      title: 'card2',
      placeId: 's1',
    },
  }

  const places = {
    s1: {
      id: 's1',
      cardId: 'c2',
    },
    s2: {
      id: 's2',
      cardId: 'c1',
    },
  }

  const state = {
    cards,
    places,
  }

  const actual = movedCards(state, 'c1', 's1')

  it('should update cards correctly', () => {
    // const { cards: movedCards } = actual
    const expected = {
      c1: {
        ...cards.c1,
        placeId: 's1',
        title: 'card1',
      },
      c2: {
        ...cards.c2,
        placeId: 's2',
        title: 'card2',
      },
    }
    expect(actual.cards).toEqual(expected)
  })

  it('should update places correctly', () => {
    const { places: movedPlaces } = actual
    const expected = {
      s1: {
        ...places.s1,
        cardId: 'c1',
      },
      s2: {
        ...places.s2,
        cardId: 'c2',
      },
    }
    expect(movedPlaces).toEqual(expected)
  })
})
