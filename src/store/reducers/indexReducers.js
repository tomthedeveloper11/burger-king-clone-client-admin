const initialState = {
  isLoading: true,
}

const indexReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'setIsLoading':
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
}

export default indexReducer
