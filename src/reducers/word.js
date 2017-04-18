import find from 'lodash/find'
import pick from 'lodash/pick'
import reduce from 'lodash/reduce'
import shuffle from 'lodash/shuffle'

const INIT = 'init/INIT'
const DELETE = 'delete/DELETE'
const MARK = 'mark/MARK'
const SUBMIT = 'submit/SUBMIT'
const DROP = 'drop/DROP'


const initialState = {
  now: {
    available: [],
    cards: {},
    completed: undefined,
    position: 0,
    slots: {},
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

const dropIt = (sourceId, targetId) => ({
  type: DROP,
  payload: {
    sourceId,
    targetId,
  },
})

const handleDrop = ({ targetId: targetSlotId, sourceId: sourceCardId, state }) => {
  const { available, cards, slots } = state.now
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

  const newAvailable = targetSlot.cardId && available.length !== 0 ?
  available.filter(x => x !== sourceCardId).concat(targetSlot.cardId) :
  available.filter(x => x !== sourceCardId)
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
    available: newAvailable,
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


const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case INIT: {
      const { originalWord } = payload
      const shuffled = shuffle(originalWord.split(''))
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
      const cardsObject = shuffled.reduce(createCard, {})
      const slotObject = shuffled.reduce(createSlot, {})
      return {
        ...initialState,
        now: {
          ...state.now,
          available: Object.keys(cardsObject),
          cards: cardsObject,
          slots: slotObject,
        },
        originalWord,
      }
    }

    case SUBMIT: {
      const { letter } = payload
      const { available, cards, position, slots } = state.now
      const availableCards = pick(cards, available)
      const card = find(availableCards, c => c.letter === letter)
      if (!card) { return state }
      const sourceId = card.id
      const targetId = slots[Object.keys(slots)[position]].id
      return handleType({ targetId, sourceId, state })
    }

    case DELETE: {
      if (state.history.length) {
        const now = state.history.pop()
        return {
          ...state,
          now,
        }
      }
      return state
    }

    case MARK: {
      const { originalWord } = state
      const { cards, available, slots } = state.now
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

      const completed = available.length === 0
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
