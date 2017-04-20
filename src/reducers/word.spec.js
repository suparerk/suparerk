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
        title: 'd',
        slotId: 'c2',
      },
      c2: {
        title: 'o',
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
      }
    }
    const action = dropIt('c1', 'c1')
    const actual = reducer(state, action)

    it('should update cards', () => {
      const { now: { cards: movedCards } } = actual
      const expected = {
        c1: {
          title: 'd',
          slotId: 'c1',
        },
        c2: {
          title: 'o',
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
})

describe('submit actions', () => {
  const initial = reducer(initialState, initialize('family'))

  it('return input array', () => {
    const action = letterSubmit('test')
    const actual = reducer(initial, action)
    const expected = {
      inputArray: [
        { letter: 't' },
        { letter: 'e' },
        { letter: 's' },
        { letter: 't' }],
    }
    expect(actual.inputArray).toEqual(expected.inputArray)
  })
})

describe('mark actions', () => {
  const initial = reducer(initialState, initialize('family'))

  it('return check false', () => {
    const submit = reducer(initial, letterSubmit('t'))
    const action = markIt()
    const actual = reducer(submit, action)
    const expected = {
      inputArray: [
        { letter: 't', check: false }],
    }
    expect(actual.inputArray).toEqual(expected.inputArray)
  })

  it('return check true', () => {
    const submit = reducer(initial, letterSubmit('f'))
    const action = markIt()
    const actual = reducer(submit, action)
    const expected = {
      inputArray: [
        { letter: 'f', check: true }],
    }
    expect(actual.inputArray).toEqual(expected.inputArray)
  })


  describe('everything else', () => {
    const action = { type: 'SOMETHING_ELSE' }
    const actual = reducer(initialState, action)

    it('returns initialState', () => {
      expect(actual).toEqual(initialState)
    })
  })
})
