import shuffle from 'lodash/shuffle'
// import includes from 'lodash/includes'

const INIT = 'init/INIT'
const MARK = 'mark/MARK'
const SUBMIT = 'submit/SUBMIT'

const initialState = {
  input: '',
  inputArray: [],
  shuffled: [],
}

const initialize = originalWord => ({
  type: INIT,
  payload: {
    originalWord,
  },
})

const wordSubmit = input => ({
  type: SUBMIT,
  payload: {
    input,
  },
})

const markIt = () => ({
  type: MARK,
  payload: {},
})

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case INIT: {
      const { originalWord } = payload
      const shuffled = shuffle(originalWord)
      return {
        ...state,
        originalWord,
        shuffled,
      }
    }
    case SUBMIT: {
      const input = payload.input.toLowerCase()
      const { originalWord } = state
      const inputArray = input.split('').map(letter => ({
        letter,
      }))
      return {
        ...state,
        input,
        inputArray,
      }
    }
    case MARK: {
      const { originalWord } = state
      const { inputArray } = state
      const marked = inputArray.map(({ letter }, index) => ({
        letter,
        check: letter === originalWord[index],
      }))
      return {
        ...state,
        inputArray: marked,
      }
    }
    default: {
      return state
    }
  }
}

export {
  initialize,
  initialState,
  markIt,
  wordSubmit,
}

export default reducer
