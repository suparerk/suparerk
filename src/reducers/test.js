const TEST = 'test/TEST'

const initialState = {
  clicks: 0,
}
const testClick = () => ({
  type: TEST,
})

const reducer = (state = initialState, { type }) => {
  switch (type) {
    case TEST: {
      return {
        ...state,
        clicks: state.clicks + 1,
      }
    }
    default: {
      return state
    }
  }
}

export { testClick }
export default reducer
