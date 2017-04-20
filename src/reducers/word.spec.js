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

    it('stores cards in slots', () => {
      const { now: { cards, slots } } = actual
      const slotsLetters = map(slots, 'cardId')
        .map(id => cards[id])
        .map(c => c.letter)
        .sort()
      expect(slotsLetters).toEqual(['d', 'o'])
    })
  })

  describe('dropIt(sourceId, targetId)', () => {
    const cards = {
      c1: {
        letter: 'd',
        slotId: 'c2',
      },
      c2: {
        letter: 'o',
        slotId: 'c1',
      },
    }
    const slots = {
      c1: { cardId: 'c2' },
      c2: { cardId: 'c1' },
    }
    const state = {
      ...initialState,
      now: {
        slots,
        cards,
      },
    }
    const action = dropIt('c1', 'c1')
    const actual = reducer(state, action)

    it('should update cards', () => {
      const { now: { cards: movedCards } } = actual
      const expected = {
        c1: {
          letter: 'd',
          slotId: 'c1',
        },
        c2: {
          letter: 'o',
          slotId: 'c2',
        },
      }
      expect(movedCards).toEqual(expected)
    })

    it('should update slots', () => {
      const { now: { slots: movedSlots } } = actual
      const expected = {
        c1: { cardId: 'c1' },
        c2: { cardId: 'c2' },
      }
      expect(movedSlots).toEqual(expected)
    })
  })

  describe('letterSubmit(letter)', () => {
    const cards = {
      c1: {
        id: 'c1',
        letter: 'd',
        slotId: 'c2',
      },
      c2: {
        id: 'c2',
        letter: 'o',
        slotId: 'c1',
      },
    }
    const slots = {
      c1: { id: 'c1', cardId: 'c2' },
      c2: { id: 'c2', cardId: 'c1' },
    }
    const state = {
      ...initialState,
      now: {
        slots,
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

    it('should update cards', () => {
      const action = letterSubmit('d')
      const actual = reducer(state, action)
      const { now } = actual
      const newCards = {
        c1: {
          id: 'c1',
          letter: 'd',
          slotId: 'c1',
        },
        c2: {
          id: 'c2',
          letter: 'o',
          slotId: 'c2',
        },
      }
      const newSlots = {
        c1: { id: 'c1', cardId: 'c1' },
        c2: { id: 'c2', cardId: 'c2' },
      }
      const expected = {
        cards: newCards,
        slots: newSlots,
        position: 1,
      }
      expect(now).toEqual(expected)
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
