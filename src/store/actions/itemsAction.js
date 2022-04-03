import { FETCH_ITEMS, SET_ISLOADING } from './actionTypes'
import { showError } from './indexAction'

export const fetchItems = () => {
  return (dispatch) => {
    dispatch({ type: SET_ISLOADING, payload: true })

    fetch('https://burger-king-clone.herokuapp.com/Items', {
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
        setTimeout(() => {
          dispatch({ type: SET_ISLOADING, payload: false })
          dispatch({ type: FETCH_ITEMS, payload: result })
        }, 2000)
      })
      .catch((err) => {
        showError(err)
      })
  }
}

export const fetchItemById = (id) => {
  return () => {
    return fetch('https://burger-king-clone.herokuapp.com/Items/' + id, {
      headers: { access_token: localStorage.access_token },
    })
  }
}

export const addItem = (payload) => {
  return () => {
    return fetch('https://burger-king-clone.herokuapp.com/Items', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
        access_token: localStorage.access_token,
      },
      body: JSON.stringify(payload),
    })
  }
}

export const editItem = (id, payload) => {
  return () => {
    return fetch('https://burger-king-clone.herokuapp.com/Items/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        access_token: localStorage.access_token,
      },
      body: JSON.stringify(payload),
    })
  }
}

export const deleteItem = (id) => {
  return (dispatch, getState) => {
    fetch('https://burger-king-clone.herokuapp.com/Items/' + id, {
      method: 'DELETE',
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
      .then(() => {
        let newArray = getState().productsReducer.items.filter(
          (item) => item.id !== id
        )
        dispatch({ type: FETCH_ITEMS, payload: newArray })
      })
      .catch((err) => {
        showError(err)
      })
  }
}
