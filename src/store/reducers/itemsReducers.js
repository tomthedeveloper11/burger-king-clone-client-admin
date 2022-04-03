const initialState = {
  items: [],
  itemById: {},
}

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'fetchItems':
      return { ...state, items: action.payload }
    case 'fetchItemById':
      return { ...state, itemById: action.payload }
    default:
      return state
  }
}

export default productsReducer
