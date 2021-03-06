import find from 'lodash/find'
import pick from 'lodash/pick'
import map from 'lodash/map'
import shuffle from 'lodash/shuffle'
import { handleDrop, moveCards, storeHistory } from './lib'

const INIT = 'init/INIT'
const DELETE = 'delete/DELETE'
const MARK = 'mark/MARK'
const SUBMIT = 'submit/SUBMIT'
const DROP = 'drop/DROP'

const initialState = {
  now: {
    cards: {},
    completed: undefined,
    position: 0,
    places: {},
  },
  history: [],
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

const dropIt = (sourceId, targetId) => ({
  type: DROP,
  payload: {
    sourceId,
    targetId,
  },
})

const handleType = ({ targetId, sourceId, state }) => {
  const { cards, places } = moveCards(state.now, sourceId, targetId)
  const { now, history } = storeHistory(state, { cards, places })
  return {
    ...state,
    now: {
      ...now,
      position: now.position + 1,
    },
    history,
  }
}

const createCard = (a, letter, index) => {
  const theIndex = `c-${letter}-${index}`
  return {
    ...a,
    [theIndex]: {
      id: theIndex,
      letter,
      state: undefined,
    },
  }
}

const createPlace = (a, letter, index) => {
  const { places, cards } = a
  const theIndex = `s-${letter}-${index}`
  const card = cards[Object.keys(cards)[index]]
  const newPlace = {
    [theIndex]: {
      id: theIndex,
      cardId: card.id,
    },
  }
  const newCard = {
    [card.id]: {
      ...card,
      placeId: theIndex,
    },
  }

  return {
    ...a,
    places: {
      ...places,
      ...newPlace,
    },
    cards: {
      ...cards,
      ...newCard,
    },
  }
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case INIT: {
      const { originalWord } = payload
      const splitWord = originalWord.split('')
      const initialCards = shuffle(splitWord).reduce(createCard, {})
      const { cards, places } = splitWord.reduce(createPlace, { cards: initialCards, places: {} })
      return {
        ...initialState,
        now: {
          ...initialState.now,
          cards,
          places,
        },
        originalWord,
      }
    }

    case DROP: {
      const { sourceId, targetId } = payload
      const { cards, places } = moveCards(state.now, sourceId, targetId)
      const { now, history } = storeHistory(state, { cards, places })

      return {
        ...state,
        now,
        history,
      }
    }

    case SUBMIT: {
      const { letter } = payload
      const { cards, position, places } = state.now
      const available = pick(cards, map(places, 'cardId').slice(position))
      const card = find(available, c => c.letter === letter)

      if (!card) {
        return state
      }
      const sourceId = card.id
      const targetId = places[Object.keys(places)[position]].id
      return handleType({ targetId, sourceId, state })
    }

    case DELETE: {
      const { history: oldHistory } = state
      const now = oldHistory.slice(-1)[0]
      const history = oldHistory.slice(0, -1)
      return {
        ...state,
        now: {
          ...state.now,
          ...now,
        },
        history,
      }
    }
    case MARK: {
      const { originalWord, now, now: { cards, places } } = state

      const checkCardState = (a, placeId, i) => {
        const place = places[placeId]
        const card = cards[place.cardId]
        return {
          ...a,
          [place.cardId]: {
            ...card,
            state: card.letter === originalWord[i],
          },
        }
      }
      const checkedCards = Object.keys(places).reduce(checkCardState, {})

      return {
        ...state,
        now: {
          ...now,
          cards: {
            ...cards,
            ...checkedCards,
          },
        },
      }
    }

    default: {
      return state
    }
  }
}

export { initialState, initialize, letterSubmit, deleteIt, dropIt, markIt }

export default reducer
