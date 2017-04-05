// import shuffle from 'lodash/shuffle'
import pick from 'lodash/pick'
import find from 'lodash/find'
import reduce from 'lodash/reduce'
import every from 'lodash/every'


const INIT = 'init/INIT'
const DELETE = 'delete/DELETE'
const MARK = 'mark/MARK'
const SUBMIT = 'submit/SUBMIT'


const initialState = {
  now: {
    available: [2, 3, 4, 5, 6, 1],
    placed: [],
    cards: {
      1: { id: 1, letter: 'a', state: undefined },
      2: { id: 2, letter: 'm', state: undefined },
      3: { id: 3, letter: 'i', state: undefined },
      4: { id: 4, letter: 'l', state: undefined },
      5: { id: 5, letter: 'y', state: undefined },
      6: { id: 6, letter: 'f', state: undefined },
    },
    completed: false,
  },
  history: [
    {
      available: [1, 2, 3, 4, 5, 6],
      placed: [],
      cards: {
        1: { id: 1, letter: 'a', state: undefined },
        2: { id: 2, letter: 'm', state: undefined },
        3: { id: 3, letter: 'i', state: undefined },
        4: { id: 4, letter: 'l', state: undefined },
        5: { id: 5, letter: 'y', state: undefined },
        6: { id: 6, letter: 'f', state: undefined },
      },
    },
    {
      available: [1, 2, 3, 4, 5],
      placed: [6],
      cards: {
        1: { id: 1, letter: 'a', state: undefined },
        2: { id: 2, letter: 'm', state: undefined },
        3: { id: 3, letter: 'i', state: undefined },
        4: { id: 4, letter: 'l', state: undefined },
        5: { id: 5, letter: 'y', state: undefined },
        6: { id: 6, letter: 'f', state: undefined },
      },
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

const deleteIt = () => ({
  type: DELETE,
  payload: {},
})

const markIt = () => ({
  type: MARK,
  payload: {},
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
      if (card) {
        const now = {
          ...state.now,
          placed: placed.concat(card.id),
          available: available.filter(x => x !== card.id),
        }
        return {
          ...state,
          now,
          history: state.history.concat(state.now),
        }
      }
      return state
    }
    case DELETE: {
      if (state.history.length) {
        const previousState = state.history.pop()
        return {
          ...state,
          now: previousState,
        }
      }

      return state
    }
    case MARK: {
      const { originalWord } = state
      const { placed, cards, available } = state.now
      const placedCards = pick(cards, placed)
      if (placedCards) {
        const checkCardState = (a, id, i) => {
          const card = cards[id]
          return {
            ...a,
            [id]: {
              ...card,
              state: card.letter === originalWord[i],
            },
          }
        }
        const checkedCards = reduce(placed, checkCardState, {})
        const completed = available.length === 0 && placed.length && every(placedCards, ['state', true])
        return {
          ...state,
          now: {
            ...state.now,
            cards: {
              ...cards,
              ...checkedCards,
            },
            completed,
          },

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
  deleteIt,
  markIt,
}

export default reducer
