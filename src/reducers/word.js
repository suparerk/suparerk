// const TEST = 'test/TEST'

const initialState = {
  input: '',
}
const wordSubmit = () => ({
  type: 'SUBMIT',
})

const reducer = (state = initialState, { type }) => {
  console.log(state.input)
  console.log(type)
  switch (type) {
    case 'SUBMIT': {
      return {
        ...state,
      }
    }
    default: {
      return state
    }
  }
}

export { wordSubmit }
export default reducer
