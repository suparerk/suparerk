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

const drop = ({ targetId: targetSlotId, sourceId: sourceCardId, state }) => {
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
      const { available, cards, position: previousPosition, slots } = state.now
      // const { originalWord } = state
      const availableCards = pick(cards, available)
      const card = find(availableCards, c => c.letter === letter)
      if (!card) { return state }

      const position = previousPosition + 1

      const sourceId = card.id
      const targetId = slots[Object.keys(slots)[previousPosition]].id
      const newState = {
        ...state,
        now: {
          ...state.now,
          position,
        },
      }
      return drop({ targetId, sourceId, state: newState })
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
      const { cards, available, slots } = state.now
      const checkCardState = (a, slot, i) => {
        const card = slot.cardId !== null ? cards[slot.cardId] : {}
        return {
          ...a,
          [slot.cardId]: {
            ...card,
            state: card.letter === originalWord[i],
          },
        }
      }
      const checkedCards = reduce(slots, checkCardState, {})
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
      return drop({ targetId, sourceId, state })
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
