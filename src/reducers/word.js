import every from 'lodash/every'
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
    completed: undefined,
    available: [],
    placed: [],
    cards: {},
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
            slotId: null,
          },
        }
      }
      const createSlot = (a, letter, index) => {
        return {
          ...a,
          [index]:
          {
            id: index,
            cardId: null,
          },
        }
      }
      const cardsObject = shuffled.reduce(createCard, {})
      const slotObject = shuffled.reduce(createSlot, {})
      return {
        ...initialState,
        now: {
          ...state.now,
          available: shuffled.map((id, index) => index),
          cards: cardsObject,
          slots: slotObject,
        },
        originalWord,
      }
    }
    case SUBMIT: {
      const { letter } = payload
      const { available, cards, placed, slots } = state.now
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
    case DROP: {
      const sourceCardId = payload.sourceId
      const targetSlotId = payload.targetId
      const { available, cards, slots } = state.now
      const sourceCard = sourceCardId !== null ? cards[sourceCardId] : null
      const targetSlot = targetSlotId !== null ? slots[targetSlotId] : null
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
      return {
        ...state,
        now: {
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
          available: available.filter(x => x !== sourceCardId),
        },
      }
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
