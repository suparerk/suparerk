import every from 'lodash/every'
import find from 'lodash/find'
import pick from 'lodash/pick'
import reduce from 'lodash/reduce'
import shuffle from 'lodash/shuffle'

const INIT = 'init/INIT'
const DELETE = 'delete/DELETE'
const MARK = 'mark/MARK'
const SUBMIT = 'submit/SUBMIT'


const initialState = {
  now: {
    completed: undefined,
    available: [],
    placed: [],
    cards: {},
  },
  history: [
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
      const shuffled = shuffle(originalWord.split(''))
      const createCard = (a, letter, index) => {
        return {
          ...a,
          [index]:
          {
            id: index,
            letter,
            state: undefined,
          },
        }
      }
      const cardsObject = shuffled.reduce(createCard, {})
      return {
        ...initialState,
        now: {
          ...state.now,
          available: shuffled.map((id, index) => index),
          cards: cardsObject,
        },
        originalWord,
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
