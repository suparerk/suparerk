// const TEST = 'test/TEST'

const initialState = {
  input: 'test',
}
const wordSubmit = () => ({
  type: 'SUBMIT',
})

const reducer = (state = initialState, { type }) => {
  switch (type) {
    case 'SUBMIT': {
      return {
        ...state,
        input: state.input,
      }
    }
    default: {
      return state
    }
  }
}

export { wordSubmit }
export default reducer
