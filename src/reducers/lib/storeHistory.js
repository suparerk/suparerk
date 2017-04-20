const storeHistory = (oldState, newState) => {
  const { history, now } = oldState
  return {
    ...oldState,
    now: {
      ...now,
      ...newState,
    },
    history: history.concat(now),
  }
}

export default storeHistory
