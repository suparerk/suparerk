// const TEST = 'test/TEST'

const initialState = {
  input: 'test',
}
export const wordSubmit = input => ({
  type: 'WORD_SUBMIT',
  input,
})

const reducer = (state = initialState, { type, input }) => {
  switch (type) {
    case 'WORD_SUBMIT': {
      return {
        ...state,
        input,
      }
    }
    default: {
      return state
    }
  }
}

export default reducer
