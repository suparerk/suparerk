import storeHistory from './storeHistory'


describe('storeHistory', () => {
  const beforeState = {
    now: {
      cards: 'cards',
      slots: 'slots',
    },
    history: [],
  }

  const newState = {
    cards: 'CARDS',
    slots: 'SLOTS',
  }

  const actual = storeHistory(beforeState, newState)


  it('stores beforeState in history and replaces now with newState', () => {
    const expected = {
      now: {
        cards: 'CARDS',
        slots: 'SLOTS',
      },
      history: [
        {
          cards: 'cards',
          slots: 'slots',
        },
      ],
    }

    expect(actual).toEqual(expected)
  })
})
