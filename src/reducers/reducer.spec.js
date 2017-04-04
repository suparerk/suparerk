import reducer, {
  initialState,
  initialize,
  wordSubmit,
} from './word'

describe('reducers/word', () => {
  describe('other actions', () => {
    const action = { type: 'SOMETHING_ELSE' }
    const actual = reducer(initialState, action)

    it('returns initialState', () => {
      expect(actual).toEqual(initialState)
    })
  })

  describe('init actions', () => {
    const action = initialize('family')
    const actual = reducer(initialState, action)
    const expected = {
      originalWord: 'family',
      shuffled: ['a', 'f', 'i', 'l', 'm', 'y'],
    }

    it('returns originalWord', () => {
      expect(actual.originalWord).toEqual(expected.originalWord)
    })
    it('returns shuffled', () => {
      expect(actual.shuffled.sort()).toEqual(expected.shuffled)
    })
  })

  describe('submit actions', () => {
    const initial = reducer(initialState, initialize('family'))

    it('return check false', () => {
      const action = wordSubmit('t')
      const actual = reducer(initial, action)
      const expected = {
        inputArray: [{
          check: false,
          letter: 't',
        }],
      }
      expect(actual.inputArray).toEqual(expected.inputArray)
    })

    it('return check true', () => {
      const action = wordSubmit('f')
      const actual = reducer(initial, action)
      const expected = {
        inputArray: [{
          check: true,
          letter: 'f',
        }],
      }
      expect(actual.inputArray).toEqual(expected.inputArray)
    })
  })
})
