const handleDrop = ({ cards, slots }, { targetId, sourceId }) => {
  const sourceCard = { ...cards[sourceId] }
  const targetSlot = { ...slots[targetId] }

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
  const oldSlot = {
    [targetId]: {
      ...slots[targetId],
      cardId: sourceId,
    },
  }
  const oldCard = {
    [sourceId]: {
      ...cards[sourceId],
      slotId: targetId,
    },
  }
  return {
    slots: {
      ...slots,
      ...newSlot,
      ...oldSlot,
    },
    cards: {
      ...cards,
      ...newCard,
      ...oldCard,
    },
  }
}

export default handleDrop
