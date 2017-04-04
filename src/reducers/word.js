import shuffle from 'lodash/shuffle'
// import includes from 'lodash/includes'


const SUBMIT = 'submit/SUBMIT'
const INIT = 'init/INIT'

const initialState = {
  input: '',
  inputArray: [],
  shuffled: [],
}

const wordSubmit = input => ({
  type: SUBMIT,
  payload: {
    input,
  },
})

const initialize = originalWord => ({
  type: INIT,
  payload: {
    originalWord,
  },
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
      const inputArray = input.split('').map((letter, index) => ({
        letter,
        check: letter === originalWord[index],
      }))
      return {
        ...state,
        input,
        inputArray,
      }
    }
    default: {
      return state
    }
  }
}

export {
  initialState,
  initialize,
  wordSubmit,
}

export default reducer
