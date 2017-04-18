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
            slotId: index,
          },
        }
      }
      const createSlot = (a, letter, index) => {
        return {
          ...a,
          [index]:
          {
            id: index,
            cardId: index,
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
      const { available, cards, slots } = state.now
      const availableCards = pick(cards, available)
      const card = find(availableCards, c => c.letter === letter)
      const firstEmptySlot = find(slots, s => s.cardId === null)
      if (card) {
        const now = {
          ...state.now,
          slots: {
            ...slots,
            [firstEmptySlot.id]: {
              ...slots[firstEmptySlot.id],
              cardId: card.id,
            },
          },
          cards: {
            ...cards,
            [card.id]: {
              ...card,
              slotId: firstEmptySlot.id,
            },
          },
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
      const { cards, available, slots } = state.now
      // const Cards = pick(cards, )
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
      const sourceCardId = payload.sourceId
      const targetSlotId = payload.targetId
      const { available, cards, slots } = state.now
      const sourceCard = sourceCardId !== null ? cards[sourceCardId] : null
      const targetSlot = targetSlotId !== null ? slots[targetSlotId] : null
      const newSlot = sourceCard.slotId !== null && {
        [sourceCard.slotId]: {
          ...slots[sourceCard.slotId],
          cardId: targetSlot.cardId,
        },
      }
      const newCard = targetSlot.cardId !== null && {
        [targetSlot.cardId]: {
          ...cards[targetSlot.cardId],
          slotId: sourceCard.slotId,
        },
      }
      const newAvailable = targetSlot.cardId !== null &&  available.length !== 0 ?
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
