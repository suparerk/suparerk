import find from 'lodash/find'
import pick from 'lodash/pick'
import map from 'lodash/map'
import shuffle from 'lodash/shuffle'

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
    slots: {},
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

const handleDrop = ({ targetId: targetSlotId, sourceId: sourceCardId, state }) => {
  const { cards, slots } = state.now
  const sourceCard = { ...cards[sourceCardId] }
  const targetSlot = { ...slots[targetSlotId] }

  const newSlot = sourceCard.slotId && {
    [sourceCard.slotId]: {
      ...slots[sourceCard.slotId],
      cardId: targetSlot.cardId,
    },
  }
  const newCard = targetSlot.cardId && {
    [targetSlot.cardId]: {
      ...cards[targetSlot.cardId],
      slotId: sourceCard.slotId,
    },
  }
  const now = {
    ...state.now,
    slots: {
      ...slots,
      [targetSlotId]: {
        ...slots[targetSlotId],
        cardId: sourceCardId,
      },
      ...newSlot,
    },
    cards: {
      ...cards,
      [sourceCardId]: {
        ...cards[sourceCardId],
        slotId: targetSlotId,
      },
      ...newCard,
    },
  }
  return {
    ...state,
    now,
    history: state.history.concat(state.now),
  }
}

const handleType = ({ targetId, sourceId, state }) => {
  const newState = handleDrop({ targetId, sourceId, state })
  const { now } = newState
  return {
    ...newState,
    now: {
      ...now,
      position: now.position + 1,
    },
  }
}

const createCard = (a, letter, index) => {
  const theIndex = `a${index}`
  return {
    ...a,
    [theIndex]:
    {
      id: theIndex,
      letter,
      state: undefined,
      slotId: theIndex,
    },
  }
}

const createSlot = (a, letter, index) => {
  const theIndex = `a${index}`
  return {
    ...a,
    [theIndex]:
    {
      id: theIndex,
      cardId: theIndex,
    },
  }
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case INIT: {
      const { originalWord } = payload
      const shuffled = shuffle(originalWord.split(''))

      const cardsObject = shuffled.reduce(createCard, {})
      const slotObject = shuffled.reduce(createSlot, {})
      return {
        ...initialState,
        now: {
          ...state.now,
          cards: cardsObject,
          slots: slotObject,
        },
        originalWord,
      }
    }

    case SUBMIT: {
      const { letter } = payload
      const { cards, position, slots } = state.now
      const available = pick(cards, map(slots, 'cardId').slice(position))
      const card = find(available, c => c.letter === letter)
      if (!card) { return state }
      const sourceId = card.id
      const targetId = slots[Object.keys(slots)[position]].id
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
      const { originalWord, now, now: { cards, slots } } = state

      const checkCardState = (a, slotId, i) => {
        const slot = slots[slotId]
        const card = cards[slot.cardId]
        return {
          ...a,
          [slot.cardId]: {
            ...card,
            state: card.letter === originalWord[i],
          },
        }
      }
      const checkedCards = Object.keys(slots).reduce(checkCardState, {})

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

    case DROP: {
      const { sourceId, targetId } = payload
      return handleDrop({ targetId, sourceId, state })
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
  dropIt,
  markIt,
}

export default reducer
