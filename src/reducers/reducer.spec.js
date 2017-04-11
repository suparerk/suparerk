import reducer, {
  initialize,
  initialState,
  markIt,
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

    it('return input array', () => {
      const action = wordSubmit('test')
      const actual = reducer(initial, action)
      const expected = {
        inputArray: [
          { letter: 't' },
          { letter: 'e' },
          { letter: 's' },
          { letter: 't' }]
      }
      expect(actual.inputArray).toEqual(expected.inputArray)
    })
  })

  describe('mark actions', () => {
    const initial = reducer(initialState, initialize('family'))

    it('return check false', () => {
      const submit = reducer(initial, wordSubmit('t'))
      const action = markIt()
      const actual = reducer(submit, action)
      const expected = {
        inputArray: [
          { letter: 't', check: false }]
      }
      expect(actual.inputArray).toEqual(expected.inputArray)
    })

    it('return check true', () => {
      const submit = reducer(initial, wordSubmit('f'))
      const action = markIt()
      const actual = reducer(submit, action)
      const expected = {
        inputArray: [
          { letter: 'f', check: true }]
      }
      expect(actual.inputArray).toEqual(expected.inputArray)
    })
  })

}
)
