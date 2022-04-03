import { FETCH_CATEGORIES, SET_ISLOADING } from './actionTypes'
import { showError } from './indexAction'

export const fetchCategories = () => {
  return (dispatch) => {
    dispatch({ type: SET_ISLOADING, payload: true })

    fetch('https://burger-king-clone.herokuapp.com/Categories', {
      headers: { access_token: localStorage.access_token },
    })
      .then(async (res) => {
        const data = await res.json()

        if (!res.ok) {
          const error = (data && data.message) || res.statusText
          return Promise.reject(error)
        }

        return data
      })
      .then((result) => {
        result.forEach((category) => {
          const createdAt = new Date(category.createdAt)
          const updatedAt = new Date(category.updatedAt)
          category.createdAt = new Intl.DateTimeFormat('id-ID').format(
            createdAt
          )
          category.updatedAt = new Intl.DateTimeFormat('id-ID').format(
            updatedAt
          )
        })

        setTimeout(() => {
          dispatch({ type: SET_ISLOADING, payload: false })
          dispatch({ type: FETCH_CATEGORIES, payload: result })
        }, 2000)
      })
      .catch((err) => {
        showError(err)
      })
  }
}

export const fetchCategoryById = (id) => {
  return () => {
    return fetch('https://burger-king-clone.herokuapp.com/Categories/' + id, {
      headers: { access_token: localStorage.access_token },
    })
  }
}

export const addCategory = (payload) => {
  return (dispatch, getState) => {
    return fetch('https://burger-king-clone.herokuapp.com/Categories', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
        access_token: localStorage.access_token,
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        const data = await res.json()

        if (!res.ok) {
          const error = (data && data.message) || res.statusText
          return Promise.reject(error)
        }

        return data
      })
      .then(() => {
        payload.createdAt = new Intl.DateTimeFormat('id-ID').format(new Date())
        payload.updatedAt = new Intl.DateTimeFormat('id-ID').format(new Date())
        getState().productsReducer.categories.push(payload)
        let newArray = getState().productsReducer.categories
        dispatch({ type: FETCH_CATEGORIES, payload: newArray })
      })
      .catch((err) => {
        showError(err)
      })
  }
}

export const editCategory = (id, payload) => {
  return () => {
    return fetch('https://burger-king-clone.herokuapp.com/Categories/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        access_token: localStorage.access_token,
      },
      body: JSON.stringify(payload),
    })
  }
}

export const deleteCategory = (id) => {
  return (dispatch, getState) => {
    fetch('https://burger-king-clone.herokuapp.com/categories/' + id, {
      method: 'DELETE',
      headers: {
        access_token: localStorage.access_token,
      }
    })
      .then(async (res) => {
        const data = await res.json()

        if (!res.ok) {
          const error = (data && data.message) || res.statusText
          return Promise.reject(error)
        }

        return data
      })
      .then(() => {
        let newArray = getState().productsReducer.categories.filter(
          (category) => category.id !== id
        )
        dispatch({ type: FETCH_CATEGORIES, payload: newArray })
      })
      .catch((err) => {
        showError(err)
      })
  }
}
