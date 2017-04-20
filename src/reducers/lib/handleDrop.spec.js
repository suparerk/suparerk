import handleDrop from './handleDrop'

describe('handleDrop', () => {
  const cards = {
    c1: {
      id: 'c1',
      title: 'card1',
      slotId: 's2',
    },
    c2: {
      id: 'c2',
      title: 'card2',
      slotId: 's1',
    },
  }

  const slots = {
    s1: {
      id: 's1',
      cardId: 'c2',
    },
    s2: {
      id: 's2',
      cardId: 'c1',
    },
  }

  const actual = handleDrop(
    { cards, slots },
    { targetId: 's1', sourceId: 'c1' },
  )
 
  it('should update cards correctly', () => {
    const { cards: movedCards } = actual
    const expected = {
      c1: {
        ...cards.c1,
        slotId: 's1',
      },
      c2: {
        ...cards.c2,
        slotId: 's2',
      },
    }
    expect(movedCards).toEqual(expected)
  })

  it('should update slots correctly', () => {
    const { slots: movedSlots } = actual
    const expected = {
      s1: {
        ...slots.s1,
        cardId: 'c1',
      },
      s2: {
        ...slots.s2,
        cardId: 'c2',
      },
    }
    expect(movedSlots).toEqual(expected)
  })
})
