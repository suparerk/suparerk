import storeHistory from './storeHistory'


describe('storeHistory', () => {
  const beforeState = {
    now: {
      cards: 'cards',
      places: 'places',
    },
    history: [],
  }

  const newState = {
    cards: 'CARDS',
    places: 'SLOTS',
  }

  const actual = storeHistory(beforeState, newState)


  it('stores beforeState in history and replaces now with newState', () => {
    const expected = {
      now: {
        cards: 'CARDS',
        places: 'SLOTS',
      },
      history: [
        {
          cards: 'cards',
          places: 'places',
        },
      ],
    }

    expect(actual).toEqual(expected)
  })
})
