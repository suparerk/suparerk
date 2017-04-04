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
      return {
        ...state,
        originalWord,
        shuffled: shuffle(originalWord),
      }
    }
    case SUBMIT: {
      const { input } = payload
      const checkInput = (userInput, originalWord) => {
        const inputArray = userInput.split('')
        const wordArray = originalWord.split('')
        return (
          inputArray.map((letter, index) => ({
            letter, check: letter === wordArray[index] })
          )
        )
      }
      return {
        ...state,
        input,
        inputArray: checkInput(input, state.originalWord),
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
