// import shuffle from 'lodash/shuffle'
import pick from 'lodash/pick'
import find from 'lodash/find'


const INIT = 'init/INIT'
const SUBMIT = 'submit/SUBMIT'


const initialState = {
  now: {
    available: [1, 2, 3],
    placed: [4, 5, 6],
    cards: {
      1: { id: 1, letter: 'a', state: undefined },
      2: { id: 2, letter: 'm', state: undefined },
      3: { id: 3, letter: 'i', state: undefined },
      4: { id: 4, letter: 'l', state: undefined },
      5: { id: 5, letter: 'y', state: undefined },
      6: { id: 6, letter: 'f', state: undefined },
    },
  },
  history: [
    {
      available: [],
      placed: [],
      cards: {},
    },
  ],
}


const initialize = originalWord => ({
  type: INIT,
  payload: {
    originalWord,
  },
})

const letterSubmit = letter => ({
  type: SUBMIT,
  payload: {
    letter,
  },
})

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case INIT: {
      const { originalWord } = payload
      const now = state.now
      // const shuffled = shuffle(originalWord)
      return {
        ...initialState,
        now,
        originalWord,
        // shuffled,
      }
    }
    case SUBMIT: {
      const { letter } = payload
      const { available, cards, placed } = state.now
      const availableCards = pick(cards, available)
      const card = find(availableCards, c => c.letter === letter)
      if(card) {
        return {
          ...state,
          now: {
            ...state.now,
            placed: placed.concat(card.id),
            available: available.filter(x => x !== card.id),
          }
        }
      }
      return state
    }
    default: {
      return state
    }
  }
}

export {
  initialize,
  initialState,
  letterSubmit,
}

export default reducer
