import map from 'lodash/map'
import reducer, {
  initialState,
  initialize,
  deleteIt,
  dropIt,
  letterSubmit,
  markIt,
} from './word'

describe('reducers/word', () => {
  describe('initialize(originalWord)', () => {
    const word = 'do'
    const action = initialize(word)
    const actual = reducer(initialState, action)

    it('stores originalWord', () => {
      expect(actual.originalWord).toEqual(word)
    })

    it('breaks originalWord to cards', () => {
      const { now: { cards } } = actual
      const cardsLetters = map(cards, 'letter').sort()
      expect(cardsLetters).toEqual(['d', 'o'])
    })

    it('stores cards in places', () => {
      const { now: { cards, places } } = actual
      const placesLetters = map(places, 'cardId')
        .map(id => cards[id])
        .map(c => c.letter)
        .sort()
      expect(placesLetters).toEqual(['d', 'o'])
    })
  })

  describe('dropIt(sourceId, targetId)', () => {
    const cards = {
      c1: {
        id: 'c1',
        letter: 'd',
        placeId: 'c2',
      },
      c2: {
        id: 'c2',
        letter: 'o',
        placeId: 'c1',
      },
    }
    const places = {
      c1: { id: 'c1', cardId: 'c2' },
      c2: { id: 'c2', cardId: 'c1' },
    }
    const state = {
      ...initialState,
      now: {
        places,
        cards,
      },
    }
    const action = dropIt('c1', 'c1')
    const actual = reducer(state, action)

    it('should update cards', () => {
      const { now: { cards: movedCards } } = actual
      const expected = {
        c1: {
          id: 'c1',
          letter: 'd',
          placeId: 'c1',
        },
        c2: {
          id: 'c2',
          letter: 'o',
          placeId: 'c2',
        },
      }
      expect(movedCards).toEqual(expected)
    })

    it('should update places', () => {
      const { now: { places: movedPlaces } } = actual
      const expected = {
        c1: { id: 'c1', cardId: 'c1' },
        c2: { id: 'c2', cardId: 'c2' },
      }
      expect(movedPlaces).toEqual(expected)
    })
  })

  describe('letterSubmit(letter)', () => {
    const cards = {
      c1: {
        id: 'c1',
        letter: 'd',
        placeId: 'c2',
      },
      c2: {
        id: 'c2',
        letter: 'o',
        placeId: 'c1',
      },
    }
    const places = {
      c1: { id: 'c1', cardId: 'c2' },
      c2: { id: 'c2', cardId: 'c1' },
    }
    const state = {
      ...initialState,
      now: {
        places,
        cards,
        position: 0,
      },
    }
    it('should not allow non available letter', () => {
      const action = letterSubmit('z')
      const actual = reducer(state, action)
      const { now } = actual
      expect(now).toEqual(state.now)
    })

    it('should update cards, places, and position', () => {
      const action = letterSubmit('d')
      const actual = reducer(state, action)
      const { now } = actual
      const newCards = {
        c1: {
          id: 'c1',
          letter: 'd',
          placeId: 'c1',
        },
        c2: {
          id: 'c2',
          letter: 'o',
          placeId: 'c2',
        },
      }
      const newPlaces = {
        c1: { id: 'c1', cardId: 'c1' },
        c2: { id: 'c2', cardId: 'c2' },
      }
      const expected = {
        cards: newCards,
        places: newPlaces,
        position: 1,
      }
      expect(now).toEqual(expected)
    })
  })

  describe('deleteIt', () => {
    const cards = {
      c1: {
        id: 'c1',
        letter: 'd',
        placeId: 'c2',
      },
      c2: {
        id: 'c2',
        letter: 'o',
        placeId: 'c1',
      },
    }
    const places = {
      c1: { id: 'c1', cardId: 'c2' },
      c2: { id: 'c2', cardId: 'c1' },
    }
    const state = {
      ...initialState,
      now: {
        places,
        cards,
        position: 0,
      },
      history: [],
    }
    const submitAction = letterSubmit('d')
    const newState = reducer(state, submitAction)

    const action = deleteIt()
    const actual = reducer(newState, action)

    it('should go back one step', () => {
      expect(actual.history).toEqual([])
    })
  })

  describe(markIt, () => {
    it('should return false', () => {
      const state = {
        now: {
          cards: {
            a0: {
              id: 'a0',
              letter: 'o',
              placeId: 'a0',
            },
            a1: {
              id: 'a1',
              letter: 'd',
              placeId: 'a1',
            },
          },
          places: {
            a0: { id: 'a0', cardId: 'a0' },
            a1: { id: 'a1', cardId: 'a1' },
          },
        },
        originalWord: 'do',
      }
      const action = markIt()
      const actual = reducer(state, action)
      const { now: { cards } } = actual
      const expected = {
        a0: {
          id: 'a0',
          letter: 'o',
          placeId: 'a0',
          state: false,
        },
        a1: {
          id: 'a1',
          letter: 'd',
          placeId: 'a1',
          state: false,
        },
      }
      expect(cards).toEqual(expected)
    })

    it('should return true', () => {
      const state = {
        now: {
          cards: {
            a0: {
              id: 'a0',
              letter: 'o',
              placeId: 'a1',
            },
            a1: {
              id: 'a1',
              letter: 'd',
              placeId: 'a0',
            },
          },
          places: {
            a0: { id: 'a0', cardId: 'a1' },
            a1: { id: 'a1', cardId: 'a0' },
          },
        },
        originalWord: 'do',
      }
      const action = markIt()
      const actual = reducer(state, action)
      const { now: { cards } } = actual
      const expected = {
        a0: {
          id: 'a0',
          letter: 'o',
          placeId: 'a1',
          state: true,
        },
        a1: {
          id: 'a1',
          letter: 'd',
          placeId: 'a0',
          state: true,
        },
      }
      expect(cards).toEqual(expected)
    })
  })
  describe('everything else', () => {
    const action = { type: 'SOMETHING_ELSE' }
    const actual = reducer(initialState, action)

    it('returns initialState', () => {
      expect(actual).toEqual(initialState)
    })
  })
})
