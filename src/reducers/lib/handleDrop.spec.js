import handleDrop from './handleDrop'

describe('handleDrop', () => {
  const cards = {
    c1: {
      title: 'card1',
      slotId: 'c2',
    },
    c2: {
      title: 'card2',
      slotId: 'c1',
    },
  }

  const slots = {
    c1: {
      cardId: 'c2',
    },
    c2: {
      cardId: 'c1',
    },
  }

  const actual = handleDrop(
    { cards, slots },
    { targetId: 'c1', sourceId: 'c1' },
  )

  it('should update cards correctly', () => {
    const { cards: movedCards } = actual
    const expected = {
      c1: {
        ...cards.c1,
        slotId: 'c1',
      },
      c2: {
        ...cards.c2,
        slotId: 'c2',
      },
    }
    expect(movedCards).toEqual(expected)
  })

  it('should update slots correctly', () => {
    const { slots: movedSlots } = actual
    const expected = {
      c1: {
        cardId: 'c1',
      },
      c2: {
        cardId: 'c2',
      },
    }
    expect(movedSlots).toEqual(expected)
  })
})
