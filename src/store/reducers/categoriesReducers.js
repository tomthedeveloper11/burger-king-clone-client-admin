const initialState = {
  categories: [],
  categoryById: {},
}

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'fetchCategories':
      return { ...state, categories: action.payload }
    case 'fetchCategoryById':
      return { ...state, categoryById: action.payload }
    default:
      return state
  }
}

export default productsReducer
