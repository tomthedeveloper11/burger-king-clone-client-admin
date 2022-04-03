export const login = (loginData) => {
  return () => {
    return fetch('https://burger-king-clone.herokuapp.com/login', {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    })
  }
}

export const register = (registerData) => {
  return () => {
    return fetch('https://burger-king-clone.herokuapp.com/register', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
        access_token: localStorage.access_token,
      },
      body: JSON.stringify(registerData),
    })
  }
}
